require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const helmet = require('helmet');
const methodOverride = require('method-override');
const path = require('path');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Database ────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅  MongoDB connected');
    // Seed admin on first run
    require('./services/adminSeed')();
  })
  .catch(err => console.error('MongoDB error:', err));

// ─── View Engine ─────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,  // allow inline scripts / adsense
}));
// Skip logging for static file requests (images, css, js) to keep terminal clean
app.use(morgan('dev', {
  skip: (req) => req.url.startsWith('/images/') || req.url.startsWith('/css/') || req.url.startsWith('/js/')
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Sessions (stored in MongoDB)
app.use(session({
  secret: process.env.SESSION_SECRET || 'newsapp_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }  // 1 day
}));

// ─── Locals available in all views ───────────────────────────────────────────
app.use((req, res, next) => {
  res.locals.siteName    = process.env.SITE_NAME || 'AdNews';
  res.locals.siteUrl     = process.env.SITE_URL  || 'http://localhost:3000';
  res.locals.siteDesc    = process.env.SITE_DESCRIPTION || 'Latest News & Blogs';
  res.locals.isAdmin     = req.session && req.session.isAdmin;
  res.locals.currentPath = req.path;
  res.locals.categories  = require('./config/categories');
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/',        require('./routes/index'));
app.use('/news',    require('./routes/news'));
app.use('/blog',    require('./routes/blog'));
app.use('/admin',   require('./routes/admin'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error', error: err.message });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);

  // ── Auto-fetch news every 10 minutes ──
  const newsFetcher = require('./services/newsFetcher');

  // Run once immediately on startup
  newsFetcher.fetchAll().then(() => console.log('🗞️  Initial news fetch complete'));

  // Then run every 10 minutes
  cron.schedule('*/10 * * * *', async () => {
    console.log('⏰  Cron: fetching news...');
    await newsFetcher.fetchAll();
    console.log('✅  Cron: news updated');
  });
});

module.exports = app;
