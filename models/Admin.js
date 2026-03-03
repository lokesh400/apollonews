const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role:     { type: String, default: 'admin' },
}, { timestamps: true });

// Adds salt, hash, authenticate(), serializeUser(), deserializeUser()
adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);
