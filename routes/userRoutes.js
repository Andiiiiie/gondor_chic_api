const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

module.exports = (User, Product, StockInventory, ProductStock) => {
    // Services
    const userService = require('../services/userService')(User);
    const productService = require('../services/productService')(Product, StockInventory, ProductStock);

    /**
     * POST /api/users/register
     * Inscription d'un utilisateur
     */
    router.post('/register', async (req, res) => {
        try {
            console.log('📝 Données reçues pour inscription:', req.body);
            
            const result = await userService.register(req.body);
            
            res.status(201).json({
                success: true,
                message: 'Inscription réussie',
                data: result
            });

        } catch (error) {
            console.error('❌ Erreur inscription:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    });

    /**
     * POST /api/users/login
     * Connexion d'un utilisateur
     */
    router.post('/login', async (req, res) => {
        try {
            const { pseudo, password } = req.body;
            console.log('🔐 Tentative de connexion pour:', pseudo);
            
            const result = await userService.connect(pseudo, password);
            
            res.json({
                success: true,
                message: 'Connexion réussie',
                data: result
            });

        } catch (error) {
            console.error('❌ Erreur connexion:', error);
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    });

    /**
     * GET /api/users/me
     * Profil de l'utilisateur connecté (PROTÉGÉ)
     */
    router.get('/me', authenticate, async (req, res) => {
        try {
            const user = await userService.getConnected(req.token);
            
            res.json({
                success: true,
                data: user
            });

        } catch (error) {
            console.error('❌ Erreur profil:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    });

    /**
     * GET /api/users/produit-du-jour
     * Produit du jour pour utilisateur connecté (PROTÉGÉ)
     */
    router.get('/produit-du-jour', authenticate, async (req, res) => {
        try {
            const product = await productService.getActualProduct();
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Aucun produit du jour trouvé'
                });
            }

            // Ajouter info utilisateur connecté
            const user = await userService.getConnected(req.token);
            
            res.json({
                success: true,
                data: {
                    product,
                    requestedBy: {
                        pseudo: user.pseudo,
                        fullName: user.fullName
                    }
                }
            });

        } catch (error) {
            console.error('❌ Erreur produit du jour:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du produit du jour'
            });
        }
    });

    return router;
};