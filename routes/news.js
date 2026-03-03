const express = require('express');
const router  = express.Router();
const Article = require('../models/Article');

// Category listing  /news/:category
router.get('/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const page  = parseInt(req.query.page) || 1;
    const limit = 12;

    const categories = require('../config/categories');
    const catInfo = categories.find(c => c.slug === category);
    if (!catInfo) return res.status(404).render('404', { title: 'Not Found' });

    const total    = await Article.countDocuments({ category });
    const articles = await Article.find({ category })
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.render('category', {
      title:      catInfo.label,
      catInfo,
      articles,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
});

// Single article  /news/:category/:slug
router.get('/:category/:slug', async (req, res, next) => {
  try {
    const { category, slug } = req.params;

    const article = await Article.findOneAndUpdate(
      { slug, category },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!article) return res.status(404).render('404', { title: 'Not Found' });

    // Related articles
    const related = await Article.find({
      category,
      _id: { $ne: article._id },
    })
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean();

    res.render('article', {
      title:   article.title,
      article,
      related,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
