const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3009;

var users = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'bek'},
    {id: 3, name: 'chris'},
];

app.use(morgan('dev'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded


app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status((400)).end();

    const user = users.filter((user) => user.id === id)[0];
    if (!user) return res.status(404).end();
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id);
    res.status(204).end();
})

app.post('/users', (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) {
        return res.status(409).end();
    }
    const id = Date.now();
    const user = {id, name};
    users.push(user);

    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();
    const isConflict = users.filter(user => user.name === name).length
    if (isConflict) return res.status(409).end();

    const user = users.filter(user => user.id === id)[0]
    if (!user) return res.status(404).end();

    user.name = name;
    res.json(user);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


module.exports = app;