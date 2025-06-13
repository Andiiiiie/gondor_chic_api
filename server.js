const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion PostgreSQL avec Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // désactive les logs SQL
    dialectOptions: {
      ssl: false, // ou true si production avec SSL
    },
  }
);

// Test de connexion
sequelize.authenticate()
  .then(() => {
    console.log(`✅ Connecté à PostgreSQL sur ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  })
  .catch(err => {
    console.error('❌ Échec de connexion à PostgreSQL :', err.message);
    process.exit(1);
  });

// Importation des modèles et routes
const Product = require('./models/Product')(sequelize, DataTypes);
const StockInventory = require('./models/StockInventory')(sequelize, DataTypes);
const ProductStock = require('./models/ProductStock')(sequelize, DataTypes);

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/api/products', require('./routes/productRoutes')(Product, StockInventory, ProductStock));


// Route de test
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      status: 'connected'
    }
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré : http://localhost:${PORT}`);
  console.log(`Environnement : ${process.env.NODE_ENV || 'development'}`);
});
