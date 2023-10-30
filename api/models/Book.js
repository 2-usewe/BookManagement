const mongoose = require('mongoose');

const BookSchema =  mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Number },
  updatedAt: { type: Number }
});

const Books = mongoose.model('books', BookSchema);
module.exports = Books;
