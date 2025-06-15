// services/productService.js
const { Op } = require('sequelize');

module.exports = (Product, StockInventory, ProductStock) => {
    
    /**
     * Récupère le produit du jour avec son stock et prix actuels
     * Basé sur la logique existante dans productRoutes
     * @returns {Object|null} Produit du jour avec stock calculé ou null si aucun produit
     */
    async function getActualProduct() {
        try {
            // 1. Trouver le produit où produit_du_jour = true
            const product = await Product.findOne({
                where: { produit_du_jour: true }
            });

            if (!product) {
                return null;
            }

            const productId = product.id;

            // 2. Chercher le dernier inventaire pour ce produit
            // (même logique que dans votre route existante)
            const lastInventory = await StockInventory.findOne({
                where: { id_product: productId },
                order: [['date_inventory', 'DESC']]
            });

            const inventoryDate = lastInventory ? lastInventory.date_inventory : new Date(0);
            const baseQuantity = lastInventory ? lastInventory.quantity_inventory : 0;

            // 3. Récupérer les flux à partir de cette date
            // (même logique que dans votre route existante)
            const stockFlows = await ProductStock.findAll({
                where: {
                    id_product: productId,
                    date_flow: { [Op.gte]: inventoryDate }
                }
            });

            // 4. Calculer la somme des flux
            // (même logique que dans votre route existante)
            const totalFlow = stockFlows.reduce((sum, flow) => sum + flow.quantity_flow, 0);

            // 5. Calculer le stock final
            // (même logique que dans votre route existante)
            const stock = baseQuantity + totalFlow;

            // 6. Retourner le produit avec toutes ses informations et le stock calculé
            return {
                id: product.id,
                product_name: product.product_name,
                description: product.description,
                current_price: product.current_price,
                stock: stock,
                image_url: product.image_url,
                produit_du_jour: product.produit_du_jour
            };

        } catch (error) {
            console.error('Erreur dans getActualProduct:', error);
            throw new Error('Impossible de récupérer le produit du jour');
        }
    }

    // Retourner toutes les fonctions du service
    return {
        getActualProduct
    };
};