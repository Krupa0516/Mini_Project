const express = require('express');
const app = express();
const bookRoute = express.Router();
const Book = require("../model/Book");

// Add Book for store
bookRoute.route('/add-book').post((req, res, next) => {
  Book.create(req.body)
    .then(data => res.json(data))
    .catch(error => next(error));
});

// Get all Book from store
bookRoute.route('/').get((req, res, next) => {
  Book.find()
    .then(data => res.json(data))
    .catch(error => next(error));
});

// Get book by id
bookRoute.route('/read-book/:id').get((req, res, next) => {
  Book.findById(req.params.id)
    .then(data => res.json(data))
    .catch(error => next(error));
});

// Delete book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
  Book.findByIdAndRemove(req.params.id)
    .then(data => res.status(200).json({ msg: data }))
    .catch(error => next(error));
});

// Update BookStore
bookRoute.route('/update-book/:id').put((req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(data => res.json(data))
    .catch(error => next(error));
});

module.exports = bookRoute;
