const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Database connection test endpoint
app.get('/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as current_time, version() as postgres_version');
    res.status(200).json({
      status: 'Database connected',
      timestamp: result.rows[0].current_time,
      postgres_version: result.rows[0].postgres_version
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      status: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Database unavailable'
    });
  }
});

// Get all Nigerian banks
app.get('/banks', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, code, slug, created_at FROM banks ORDER BY name ASC');
    res.status(200).json({
      status: 'success',
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({
      status: 'error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch banks'
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Play Backend Service',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

module.exports = app;