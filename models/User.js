module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pseudo: {  // Pas 'username' mais 'pseudo' selon votre base
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hash_password: {  // Pas 'password' mais 'hash_password' selon votre base
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'user',  // Nom de table en minuscule selon votre base
        timestamps: false   // Pas de createdAt/updatedAt dans votre base
    });

    return User;
  };