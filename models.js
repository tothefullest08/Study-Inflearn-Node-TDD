const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false // console log 함수와 바인딩되어있음
});

const User = sequelize.define('User', {
    name: {
        type:Sequelize.STRING, // varchar 255
        unique: true,
    }
});

module.exports = ({
    Sequelize,
    sequelize,
    User,
})