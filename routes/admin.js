const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const slugify   = require('slugify');
const Blog      = require('../models/Blog');
const Article   = require('../models/Article');
const newsFetcher = require('../services/newsFetcher');

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function requireAdmin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/admin/login');
}

// ─── Login ────────────────────────────────────────────────────────────────────
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/admin');
  const error = req.query.error ? 'Invalid username or password.' : null;
  res.render('admin/login', { title: 'Admin Login', error });
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/admin/login?error=1',
    successRedirect: '/admin',
  })
);

router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/admin/login');
  });
});

// ─── Dashboard ────────────────────────────────────────────────────────────────
router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const articleCount = await Article.countDocuments();
    const blogCount    = await Blog.countDocuments();
    const latestArticles = await Article.find().sort({ publishedAt: -1 }).limit(10).lean();
    const latestBlogs    = await Blog.find().sort({ createdAt: -1 }).limit(5).lean();

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      articleCount,
      blogCount,
      latestArticles,
      latestBlogs,
    });
  } catch (err) {
    next(err);
  }
});

// ─── Manual News Fetch ────────────────────────────────────────────────────────
router.post('/fetch-news', requireAdmin, async (req, res) => {
  try {
    await newsFetcher.fetchAll();
    res.redirect('/admin?msg=News+fetched+successfully');
  } catch (err) {
    res.redirect('/admin?error=' + encodeURIComponent(err.message));
  }
});

// ─── Blog CRUD ────────────────────────────────────────────────────────────────
router.get('/blogs', requireAdmin, async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    res.render('admin/blogs', { title: 'Manage Blogs', blogs });
  } catch (err) {
    next(err);
  }
});

router.get('/blogs/new', requireAdmin, (req, res) => {
  res.render('admin/blog-form', { title: 'New Blog Post', blog: null, error: null });
});

router.post('/blogs', requireAdmin, async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, author, category, tags, published } = req.body;
    const baseSlug = slugify(title, { lower: true, strict: true }).substring(0, 90);
    let slug = baseSlug;
    let count = 1;
    while (await Blog.exists({ slug })) slug = `${baseSlug}-${count++}`;

    await Blog.create({
      title, slug, excerpt, content, coverImage,
      author: author || 'Admin',
      category: category || 'general',
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      published: published === 'on',
    });

    res.redirect('/admin/blogs?msg=Blog+created');
  } catch (err) {
    next(err);
  }
});

router.get('/blogs/:id/edit', requireAdmin, async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) return res.status(404).render('404', { title: 'Not Found' });
    res.render('admin/blog-form', { title: 'Edit Blog Post', blog, error: null });
  } catch (err) {
    next(err);
  }
});

router.put('/blogs/:id', requireAdmin, async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, author, category, tags, published } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).render('404', { title: 'Not Found' });

    if (blog.title !== title) {
      const base = slugify(title, { lower: true, strict: true }).substring(0, 90);
      let slug = base; let count = 1;
      while (await Blog.exists({ slug, _id: { $ne: blog._id } })) slug = `${base}-${count++}`;
      blog.slug = slug;
    }

    blog.title      = title;
    blog.excerpt    = excerpt;
    blog.content    = content;
    blog.coverImage = coverImage;
    blog.author     = author || 'Admin';
    blog.category   = category || 'general';
    blog.tags       = tags ? tags.split(',').map(t => t.trim()) : [];
    blog.published  = published === 'on';
    await blog.save();

    res.redirect('/admin/blogs?msg=Blog+updated');
  } catch (err) {
    next(err);
  }
});

router.delete('/blogs/:id', requireAdmin, async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/admin/blogs?msg=Blog+deleted');
  } catch (err) {
    next(err);
  }
});

// ─── Delete old news ──────────────────────────────────────────────────────────
router.post('/clean-news', requireAdmin, async (req, res) => {
  const cutoff = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const result = await Article.deleteMany({ publishedAt: { $lt: cutoff } });
  res.redirect(`/admin?msg=Deleted+${result.deletedCount}+old+articles`);
});

module.exports = router;
