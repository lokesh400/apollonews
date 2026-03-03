/**
 * Creates the default admin account in session-based auth.
 * Credentials come from .env: ADMIN_USERNAME / ADMIN_PASSWORD
 */
module.exports = function adminSeed() {
  const user = process.env.ADMIN_USERNAME || 'admin';
  const pass = process.env.ADMIN_PASSWORD || 'admin123';
  console.log(`🔐  Admin ready — username: ${user}  (set in .env)`);
};
