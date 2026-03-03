const axios   = require('axios');
const slugify  = require('slugify');
const Article  = require('../models/Article');
const categories = require('../config/categories');

const API_KEY  = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

/**
 * Generate a unique slug from a title
 */
async function makeSlug(title) {
  const base = slugify(title, { lower: true, strict: true }).substring(0, 90);
  let slug = base;
  let count = 1;
  while (await Article.exists({ slug })) {
    slug = `${base}-${count++}`;
  }
  return slug;
}

/**
 * Fetch news for a single category and upsert into MongoDB
 */
async function fetchCategory(category) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        category,
        language: 'en',
        pageSize: 20,
        apiKey: API_KEY,
      },
      timeout: 10000,
    });

    const articles = response.data.articles || [];
    let saved = 0;

    for (const item of articles) {
      if (!item.title || item.title === '[Removed]') continue;

      // Skip if article with same URL already exists
      const exists = await Article.exists({ url: item.url });
      if (exists) continue;

      const slug = await makeSlug(item.title);

      await Article.create({
        title:       item.title,
        slug,
        description: item.description,
        content:     item.content || item.description,
        url:         item.url,
        urlToImage:  item.urlToImage,
        source:      item.source?.name || 'Unknown',
        author:      item.author,
        category,
        publishedAt: item.publishedAt ? new Date(item.publishedAt) : new Date(),
      });
      saved++;
    }

    console.log(`  [${category}] +${saved} new articles`);
  } catch (err) {
    if (err.response?.status === 426) {
      console.warn(`  [${category}] NewsAPI: upgrade required for this endpoint`);
    } else {
      console.error(`  [${category}] fetch error:`, err.message);
    }
  }
}

/**
 * Fetch all categories sequentially (avoids rate limit issues on free tier)
 */
async function fetchAll() {
  if (!API_KEY || API_KEY === 'your_newsapi_key_here') {
    console.warn('⚠️  NEWS_API_KEY not set. Skipping news fetch.');
    return;
  }

  console.log('🗞️  Fetching news for all categories...');
  for (const cat of categories) {
    await fetchCategory(cat.slug);
  }

  // Clean up articles older than 7 days to keep DB lean
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await Article.deleteMany({ publishedAt: { $lt: cutoff } });
  console.log('🗑️  Cleaned up articles older than 7 days');
}

module.exports = { fetchAll, fetchCategory };
