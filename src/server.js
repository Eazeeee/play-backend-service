const app = require('./app');
const { initializeDatabase } = require('./db-init');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    if (process.env.DATABASE_URL) {
      await initializeDatabase();
    } else {
      console.log('⚠️ DATABASE_URL not found, skipping database initialization');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🏦 Banks endpoint: http://localhost:${PORT}/banks`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();