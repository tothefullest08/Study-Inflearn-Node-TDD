const {User} = require("../../models");

// API 로직
const index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    User.findAll(
        {
            limit: limit
        })
        .then(users => {
            res.json(users);
        })
};

const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status((400)).end();

    User.findOne({
        where: {id}
    }).then(user => {
        if (!user) return res.status(404).end();
        res.json(user);
    });
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    User.destroy({
        where: {id}
    }).then(() => {
        res.status(204).end();
    });
};

const create = (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    User.create({name})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
            }
            res.status(500).end();
        });
}

const update = (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    // const isConflict = users.filter(user => user.name === name).length
    // if (isConflict) return res.status(409).end();

    // const user = users.filter(user => user.id === id)[0]
    // if (!user) return res.status(404).end();

    User.findOne({where: {id}})
        .then(user => {
            if (!user) return res.status(404).end();
            user.name = name;
            user.save()
                .then(user => {
                    res.json(user);
                })
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        return res.status(409).end();
                    }
                    res.status(500).end();
                });
        });
};


module.exports = {
    index, show, destroy, create, update
}