const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})



const Book = mongoose.model('Book', bookSchema);
module.exports = Book;