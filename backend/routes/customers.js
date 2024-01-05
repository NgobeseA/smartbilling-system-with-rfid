const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, status, rewards } = req.body;

    db.query(
        'select id from users where username = ?',
        [username],
        (err, results) => {
            if(err){
                console.error('Failed to retrieve user id: ', err);
                res.send('failed to retrieve user id', err);
            }else if (results.length > 0){
                const user_id = results[0].id;

                db.query(
                    'insert into customers(user_id, status, reward_points) values ( ?, ?, ? )',
                    [ user_id, status, rewards ],
                    (err, results) => {
                        if(err){
                            console.error('Failed to insert values into customers:',err)
                        }else{
                            console.log('Succefully insert values into customers table');
                            console.log(rewards);
                            res.status(200).send(rewards);
                        }
                    }
                );
            
            } else{
                console.log('User not found');
            }
        }
    );
});

module.exports = router;