require('dotenv').config();
const { dbConnection } = require('./db');
const express = require('express');
const route = require('./routes/route');
const cors = require('cors')
const supersetRoutes = require('./routes/superset')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const startServer = async () => {
    try {
      await dbConnection();
      app.use('/api/auth', route);
      app.use('/api/superset', supersetRoutes);
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
      console.error('Failed to connect to the database:', error.message);
      process.exit(1); 
    }
  };
  
  startServer();
  