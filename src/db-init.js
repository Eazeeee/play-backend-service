const fs = require('fs');
const path = require('path');
const db = require('./database');
const nigerianBanks = require('./seeds/banks');

async function runMigrations() {
  try {
    console.log('Running database migrations...');

    const migrationPath = path.join(__dirname, 'migrations', '001_create_banks_table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    await db.query(migrationSQL);
    console.log('✅ Banks table migration completed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

async function seedBanks() {
  try {
    console.log('Seeding Nigerian banks...');

    const { rowCount } = await db.query('SELECT COUNT(*) FROM banks');
    const existingBanksCount = parseInt(rowCount > 0 ? rowCount : 0);

    if (existingBanksCount > 0) {
      console.log(`✅ Banks already seeded (${existingBanksCount} banks found)`);
      return;
    }

    for (const bank of nigerianBanks) {
      await db.query(
        'INSERT INTO banks (name, code, slug) VALUES ($1, $2, $3) ON CONFLICT (code) DO NOTHING',
        [bank.name, bank.code, bank.slug]
      );
    }

    const { rows } = await db.query('SELECT COUNT(*) as count FROM banks');
    console.log(`✅ Successfully seeded ${rows[0].count} Nigerian banks`);
  } catch (error) {
    console.error('❌ Banks seeding failed:', error);
    throw error;
  }
}

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database...');

    await runMigrations();
    await seedBanks();

    console.log('✅ Database initialization completed successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

module.exports = {
  initializeDatabase,
  runMigrations,
  seedBanks
};