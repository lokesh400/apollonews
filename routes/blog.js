const express = require('express');
const router  = express.Router();
const Blog    = require('../models/Blog');

// All blogs
router.get('/', async (req, res, next) => {
  try {
    const page  = parseInt(req.query.page) || 1;
    const limit = 9;

    const total = await Blog.countDocuments({ published: true });
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.render('blog/index', {
      title: 'Blog',
      blogs,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
});

// Single blog post
router.get('/:slug', async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!blog) return res.status(404).render('404', { title: 'Not Found' });

    const related = await Blog.find({
      published: true,
      _id: { $ne: blog._id },
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    res.render('blog/post', {
      title: blog.title,
      blog,
      related,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
