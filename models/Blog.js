const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  slug:       { type: String, unique: true, required: true },
  excerpt:    { type: String },
  content:    { type: String, required: true },
  coverImage: { type: String, default: '' },
  author:     { type: String, default: 'Admin' },
  category:   { type: String, default: 'general' },
  tags:       [{ type: String }],
  published:  { type: Boolean, default: true },
  views:      { type: Number, default: 0 },
}, { timestamps: true });

blogSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Blog', blogSchema);
