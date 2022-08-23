const express = require('express');

function createRouter(db) {
    const router = express.Router();
    const owner = 'root';

    // router for registering a new user
    router.post('/register', (req, res) => {
        const { username, password } = req.body;
        const query = `INSERT INTO users (username, password, owner) VALUES ('${username}', '${password}', '${owner}')`;
        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        }).on('error', err => {
            res.status(500).send(err);
        }).on('end', () => {
            res.status(200).send('end');
        });
    });



    return router;
}

module.exports = createRouter;