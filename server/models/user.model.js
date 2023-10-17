module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        verificationToken: {
            type: Sequelize.STRING,
        },
        verifyStatus: {
            type: Sequelize.BOOLEAN,
        },
        profile_pic:{
            type: Sequelize.STRING,
        }
    })
    return User;
}