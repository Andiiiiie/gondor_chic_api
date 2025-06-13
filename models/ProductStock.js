module.exports = (sequelize, DataTypes) => {
    const ProductStock = sequelize.define('ProductStock', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity_flow: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        comment: 'Positif = entrée, Négatif = sortie',
      },
      date_flow: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'product_stock',
      timestamps: false,
    });

    return ProductStock;
  };