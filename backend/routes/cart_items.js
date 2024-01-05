const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const {cart_id, product_id, quantity} = req.body;

    db.query(
            'insert into cart_items (cart_id, product_id, quantity) values ( ?, ?, ?)',
            [cart_id, product_id, quantity],
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