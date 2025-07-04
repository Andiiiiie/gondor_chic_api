const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

module.exports = (Product, StockInventory, ProductStock) => {

     //Import service avec les modèles
    const productService = require('../services/productService')(Product, StockInventory, ProductStock);

    router.get('/', async (req, res) => {
        try {
            // Récupérer tous les produits
            const products = await Product.findAll();

            const finalProducts = [];

            for (const product of products) {
            const productId = product.id;

            // 1. Chercher le dernier inventaire pour ce produit
            const lastInventory = await StockInventory.findOne({
                where: { id_product: productId },
                order: [['date_inventory', 'DESC']],
            });

            const inventoryDate = lastInventory ? lastInventory.date_inventory : new Date(0);
            const baseQuantity = lastInventory ? lastInventory.quantity_inventory : 0;

            // 2. Récupérer les flux à partir de cette date
            const stockFlows = await ProductStock.findAll({
                where: {
                    id_product: productId,
                    date_flow: { [Op.gte]: inventoryDate }
                }
            });

            // 3. Calculer la somme des flux
            const totalFlow = stockFlows.reduce((sum, flow) => sum + flow.quantity_flow, 0);

            // 4. Calculer le stock final
            const stock = baseQuantity + totalFlow;

            finalProducts.push({
                id: product.id,
                product_name: product.product_name,
                description: product.description,
                current_price: product.current_price,
                stock: 100,
                image_url: product.image_url
            });
            }

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json(finalProducts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    });

    // NOUVEAU: Endpoint pour le produit du jour
    router.get('/produit-du-jour', async (req, res) => {
        try {
            const product = await productService.getActualProduct();
            
            if (!product) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Aucun produit du jour trouvé.' 
                });
            }

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json({
                success: true,
                data: product
            });

        } catch (error) {
            console.error('Erreur endpoint produit-du-jour:', error);
            res.status(500).json({ 
                success: false,
                message: 'Erreur serveur',
                error: error.message 
            });
        }
    });

  return router;
};
