module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        current_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: { min: 0 },
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'product',
        timestamps: false,
    });

    return Product;
};