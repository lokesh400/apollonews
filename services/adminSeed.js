const Admin = require('../models/Admin');

/**
 * Creates the default admin account using passport-local-mongoose.
 * Credentials come from .env: ADMIN_USERNAME / ADMIN_PASSWORD
 */
module.exports = async function adminSeed() {
  const username = (process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim();
  const password =  process.env.ADMIN_PASSWORD || 'admin123';

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`🔐  Admin account ready — username: ${username}`);
    return;
  }

  // passport-local-mongoose provides Admin.register()
  await Admin.register(new Admin({ username }), password);
  console.log(`✅  Admin account created — username: ${username}`);
};
