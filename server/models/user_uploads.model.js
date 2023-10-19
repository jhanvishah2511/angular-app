'use strict';
const {
    Model, ARRAY
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserUploads extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Timedata }) {
            // define association here
            this.belongsTo(User, { foreignKey: "user_id" })
            // this.hasMany(Timedata,{foreignKey:"Attendanceid"})
        }
    }
    UserUploads.init({
        document_name: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: 'user_uploads',
    });
    return UserUploads;
};