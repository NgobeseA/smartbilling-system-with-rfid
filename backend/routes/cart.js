const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const {id, status} = req.body;

    db.query(
            'insert into carts (user_id,status) values ( ?, ?)',
            [id, status],
            (err,results) => {
                if(err) {
                    console.error('Failed to create a cart:', err);
                    res.status(500).send('failed to create a cart');
                }else{
                    console.log('cart is successfully created');
                    res.status(200).send('successfully created a cart');
                }
            }
        );
});

module.exports = router;