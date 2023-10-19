'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ UserUploads }) {
            // define association here
            this.hasMany(UserUploads, { foreignKey: "user_id", as: "user_uploads" })
        }
    }
    User.init({
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        verificationToken: {
            type: DataTypes.STRING,
        },
        verifyStatus: {
            type: DataTypes.BOOLEAN,
        },
        profile_pic: {
            type: DataTypes.STRING,
        }

    }, {
        sequelize,
        modelName: 'users',
    });
    return User;
};