const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const secretWord = 'smartbill-system'

    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, result) => {
            if (err){
                console.error('Error retrieving user:', err);
                res.status(500).send('Error retrieving user');
            } else if (result.length > 0) {
                const match = await bcrypt.compare(password.toString(), result[0].password);
            
                if(match) {
                    console.log('login successful');
                    const name = { username: result[0].username };
                    const token = jwt.sign({name}, 'smartbill-system-kit', {expiresIn: '1h'});
                    res.cookie('token', token);
                    res.status(200).send(name);
                }else{
                    console.log('Incorrect password');
                    res.status(401).json('Incorrect password');
                }

            } else{
                console.log('User not found');
                res.status(404).json('User not found');
            }
        }
    );
});


module.exports = router;