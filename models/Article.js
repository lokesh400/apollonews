const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, unique: true, required: true },
  description: { type: String },
  content:     { type: String },
  url:         { type: String },
  urlToImage:  { type: String },
  source:      { type: String },
  author:      { type: String },
  category:    { type: String, required: true, index: true },
  publishedAt: { type: Date, default: Date.now, index: true },
  views:       { type: Number, default: 0 },
}, { timestamps: true });

// Text index for search
articleSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Article', articleSchema);
