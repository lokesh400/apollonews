const express  = require('express');
const router   = express.Router();
const Article  = require('../models/Article');
const Blog     = require('../models/Blog');
const Contact  = require('../models/Contact');

// ─── Static Legal / Info Pages ────────────────────────────────────────────────

router.get('/about',             (req, res) => res.render('pages/about',            { title: 'About Us'               }));
router.get('/privacy-policy',    (req, res) => res.render('pages/privacy-policy',   { title: 'Privacy Policy'         }));
router.get('/terms',             (req, res) => res.render('pages/terms',            { title: 'Terms of Service'       }));
router.get('/disclaimer',        (req, res) => res.render('pages/disclaimer',       { title: 'Disclaimer'             }));
router.get('/dmca',              (req, res) => res.render('pages/dmca',             { title: 'DMCA Policy'            }));
router.get('/cookie-policy',     (req, res) => res.render('pages/cookie-policy',    { title: 'Cookie Policy'          }));
router.get('/copyright',         (req, res) => res.render('pages/copyright',        { title: 'Copyright Notice'       }));
router.get('/editorial-policy',  (req, res) => res.render('pages/editorial-policy', { title: 'Editorial Policy'       }));
router.get('/fact-check',        (req, res) => res.render('pages/fact-check',       { title: 'Fact Check Policy'      }));
router.get('/corrections',       (req, res) => res.render('pages/corrections',      { title: 'Corrections Policy'     }));
router.get('/advertise',         (req, res) => res.render('pages/advertise',        { title: 'Advertise With Us'      }));

// ─── Contact ──────────────────────────────────────────────────────────────────

router.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact Us', success: false, error: null });
});

router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.render('pages/contact', {
      title: 'Contact Us',
      success: false,
      error: 'All fields are required.'
    });
  }
  try {
    await Contact.create({ name, email, subject, message });
    res.render('pages/contact', { title: 'Contact Us', success: true, error: null });
  } catch (err) {
    res.render('pages/contact', {
      title: 'Contact Us',
      success: false,
      error: 'Something went wrong. Please try again.'
    });
  }
});

// ─── Sitemap ──────────────────────────────────────────────────────────────────

router.get('/sitemap', async (req, res, next) => {
  try {
    const categories = require('../config/categories');
    const blogs      = await Blog.find({ published: true }).select('slug title createdAt').sort({ createdAt: -1 }).lean();
    const articles   = await Article.find().select('slug category title publishedAt').sort({ publishedAt: -1 }).limit(200).lean();
    res.render('pages/sitemap', { title: 'Sitemap', categories, blogs, articles });
  } catch (err) { next(err); }
});

module.exports = router;
