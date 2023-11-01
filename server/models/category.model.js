'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        // static associate({ UserUploads }) {
        //     this.hasMany(UserUploads, { foreignKey: "user_id", as: "user_uploads" })
        // }
    }
    Category.init({
        categoryName: {
            type: DataTypes.STRING
        },
        categoryImage: {
            type: DataTypes.STRING
        },
        categoryStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'categories',
    });
    return Category;
}