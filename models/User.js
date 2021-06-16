const { Model, DataTypes } = require('sequelize');
const sequelize = ('../config/connection')
const bcrypt = require('bcrypt');
const { before } = require('lodash');


class User extends Model {
    checkPassword(loginPass) {
        return bcrypt.compareSync(loginPass, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            // using the before create hook to let User model to know to has the password before saving it to the system
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }, 
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        createdAt: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
    );
    module.exports = User;