const express = require('express');
const router = express.Router();
const db = require('../db');

router.put('/updatecart/:cartId', (req, res) => {
    const { cartId } = req.params;

    db.query('UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        )
})