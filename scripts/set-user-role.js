/**
 * Set Firebase Auth custom claim role by email.
 *
 * Usage:
 *   npm install firebase-admin
 *   set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\service-account.json
 *   node scripts/set-user-role.js user@company.com viewer
 *   node scripts/set-user-role.js editor@company.com editor
 *   node scripts/set-user-role.js admin@company.com admin
 */

const admin = require('firebase-admin');

const [email, role] = process.argv.slice(2);
const allowedRoles = ['viewer', 'editor', 'admin'];

if (!email || !allowedRoles.includes(role)) {
  console.error('Usage: node scripts/set-user-role.js <email> <viewer|editor|admin>');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

async function main() {
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { role });
  console.log(`Set ${email} role to ${role}. Ask the user to sign out and sign in again.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
