const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const customerRoute = require('./routes/customers');
const cart = require('./routes/cart');
const cart_items = require('./routes/cart_items');
const verifyToken = require('./routes/middlewere')

const app = express();
const port = 3001;

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.get('/auth/check-auth', verifyToken, (req, res) => {
    res.json({ isAuth: true, user: req.user });
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: 'Success'});
})


app.use('/login',  loginRoute);
app.use('/register', registerRoute);
app.use('/customers', customerRoute);
app.use('/cart', cart);
app.use('/cartitems', cart_items)

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});