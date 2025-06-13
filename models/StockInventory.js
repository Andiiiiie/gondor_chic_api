module.exports = (sequelize, DataTypes) => {
    const StockInventory = sequelize.define('StockInventory', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity_inventory: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: { min: 0 },
      },
      date_inventory: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'stock_inventory',
      timestamps: false,
    });

    return StockInventory;
  };