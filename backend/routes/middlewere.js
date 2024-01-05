const express = require('express')
const router = express.Router();
const login = require('./login');
const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);

    if (!token) {
        return res.json({Error: "You are not authenticated here."});
    } else {
         jwt.verify(token, "smartbill-system-kit", (err, decoded) => {
            if(err) {
                return res.json({Error: 'Invalid token'});
            } else {
                req.name = decoded;
                next();
            }
        });
    }
};

module.exports = verifyUser;