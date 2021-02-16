var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../model/User_model');
const tokenMiddlewear = require('../middlewear/auth');
const Book = require('../model/Book_model');

// signup with password crypto

//add users
router.post('/addUser', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            const user = new User({
                name: req.body.name,
                phone: req.body.phone,
                password: hash
            })
            user.save()
                .then(doc => {
                    res.send(doc)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
})

// Sign in and get token 

router.post('/login', (req, res) => {
    User.findOne({ name: req.body.name })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        const token = user.generateToken()
                        res.send({
                            user: user,
                            token: token
                        })
                    } else {
                        res.status(401).send("Please Enter Correct passwd")
                    }
                })
            } else {
                res.status(403).send("This account not exist")
            }
        })
        .catch(err => {
            console.log(err);
        })
})


// add books
router.post('/addBook', tokenMiddlewear, (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price
    })
    book.save()
        .then(doc => {
            res.status(500).send(doc)
        })
        .catch(err => {
            res.status(404).console.log(err);
        })
})


//Display all books 
router.get('/getAll', tokenMiddlewear, (req, res) => {
    Book.find()
        .then(books => {
            res.status(500).send(books)
        }).catch(err => {
            res.status(404).console.log(err);
        })
})
module.exports = router;