module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hash_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'user',
      timestamps: false,
    });

    return User;
  };