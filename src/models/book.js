const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required for creating Book"],
        unique: true,
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author is required for creating Book"],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, "Year is required for creating Book"],
    },
    price: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
})


const Book = mongoose.model('book', bookSchema)

module.exports = Book;