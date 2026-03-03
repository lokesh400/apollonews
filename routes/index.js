const express  = require('express');
const router   = express.Router();
const Article  = require('../models/Article');
const Blog     = require('../models/Blog');

// Home page — latest news from all categories + latest blogs
router.get('/', async (req, res) => {
  try {
    const categories = require('../config/categories');

    // Latest 6 articles per category (for category strips)
    const categoryNews = {};
    for (const cat of categories) {
      categoryNews[cat.slug] = await Article
        .find({ category: cat.slug })
        .sort({ publishedAt: -1 })
        .limit(6)
        .lean();
    }

    // Hero: top 5 general
    const heroArticles = await Article
      .find({ category: 'general' })
      .sort({ publishedAt: -1 })
      .limit(5)
      .lean();

    // Latest blogs
    const latestBlogs = await Blog
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    // Most viewed articles
    const trending = await Article
      .find()
      .sort({ views: -1, publishedAt: -1 })
      .limit(5)
      .lean();

    res.render('index', {
      title: 'Home',
      heroArticles,
      categoryNews,
      latestBlogs,
      trending,
    });
  } catch (err) {
    next(err);
  }
});

// Search
router.get('/search', async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const page  = parseInt(req.query.page) || 1;
    const limit = 12;

    const filter = q
      ? { $text: { $search: q } }
      : {};

    const total    = await Article.countDocuments(filter);
    const articles = await Article.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.render('search', {
      title: `Search: ${q}`,
      articles,
      q,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
