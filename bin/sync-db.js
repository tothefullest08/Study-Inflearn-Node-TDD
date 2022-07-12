const models = require('../models');

module.exports = () => {
    const options = {
        force: process.env.NODE_ENV === 'test' // db 가 있더라도 날리고 새로 만드는 옵션
    };
    return models.sequelize.sync(options);
}