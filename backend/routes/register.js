const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

router.post('/', async(req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    const savedPassword = await bcrypt.hash(req.body.password.toString(), 10);

    db.query(
        'INSERT INTO users (username, email, password, firstname, lastname) VALUES ( ?, ?, ?, ?, ?)',
        [req.body.username, req.body.email, savedPassword, req.body.firstname, req.body.lastname,],
        (err, results) => {
            if(err){
                console.error('Error registering user:', err);
                res.status(500).send('Error registering user');
            }else{
                console.log('User is successfully registered.');
                res.status(200).send('User is successfully registered');
            }
        }
    );
});

module.exports = router;