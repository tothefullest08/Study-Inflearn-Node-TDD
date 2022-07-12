const app = require('../index')
const syncDb = require('./sync-db');

syncDb().then(_ => {
    console.log('Sync database!')
    app.listen(3000, () => {
        console.log(`Example app listening on 3000 port`)
    })
});


