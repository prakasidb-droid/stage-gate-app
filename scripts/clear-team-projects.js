/**
 * Clear all projects for one team.
 *
 * Usage:
 *   set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\service-account.json
 *   node scripts/clear-team-projects.js team-a
 *   node scripts/clear-team-projects.js team-b
 */

const admin = require('firebase-admin');

const [teamId] = process.argv.slice(2);

if (!teamId) {
  console.error('Usage: node scripts/clear-team-projects.js <teamId>');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

async function main() {
  const db = admin.firestore();
  await db.doc(`teams/${teamId}/projects/main`).set({
    list: [],
    teamId,
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin-script',
  });
  console.log(`Cleared projects for ${teamId}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
