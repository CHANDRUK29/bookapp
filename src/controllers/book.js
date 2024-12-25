const { ObjectId } = require('mongoose').Types;
const logger = require('../config/logger');
const Book = require('../models/book');
const bookValidator = require('../validators/book')


const createBook = async (req, res) => {
    try {

        const { error, value } = bookValidator.createValidator(req.body);
        if (error) {
            return res.status(400).json({ error: 'Validation Error', errorDescription: error });
        }
        const isExistingBook = await Book.findOne({ title: value.title })
        if (isExistingBook) return res.status(422).json({ message: "Book name already exists" })

        const newBook = await Book.create({
            title: value.title,
            author: value.author,
            year: value.year,
            price: value.price
        })
        return res.status(200).json({ message: 'Book Created Successfully', data: newBook })
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ message: 'internal server error', error: error.message })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({ message: 'all books fetched successfully', data: books })
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ message: 'internal server error', error: error.message })
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: 'book not found' })

        return res.status(200).json({ message: 'book details fetched successfully', data: book })
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ message: 'internal server error', error: error.message })
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = bookValidator.updateValidator(req.body);
        if (error) {
            return res.status(400).json({ error: 'Validation Error', errorDescription: error });
        }
        if (value.title) {
            const isExistingBook = await Book.findOne({ title: value.title })
            if (isExistingBook) return res.status(422).json({ message: "unable to update,Book name already exists" })
        }
        const existingBook = await Book.findById(id);
        if (!existingBook) return res.status(404).json({ message: 'book not found' })

        const update = await Book.findByIdAndUpdate(id, value, { new: true })

        return res.status(200).json({ message: 'book updated successfully', data: update })

    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ message: 'internal server error', error: error.message })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const existingBook = await Book.findById(id);
        if (!existingBook) return res.status(404).json({ message: 'book not found,unable to delete book' })

        await Book.findByIdAndDelete(id)

        return res.status(200).json({ message: 'book deleted successfully' })

    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({ message: 'internal server error', error: error.message })
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
}