const express = require('express');
const bookRouter = express.Router();
const Books = require('../models/Book');

/**
 * @route POST /api/book/add
 * @param {title,author,summary}
 * @description  this api is used for create a book record.
 * @author Abhijit swain
 */
bookRouter.post('/add', async (req, res) => {
  console.log('inside the add route')
  try {
    let { title,
      author,
      summary} = req.body;
    if (!title || !author || !summary) {
      return res.status(400).json({
        status: 400,
        isError: true,
        message: 'Please enter all fields'
      });
    }
    //add code here to save data in database
    let timestamp = Math.floor(Date.now() / 1000);
    let createdData = {
      title: title.trim(),
      author: author.trim(),
      summary: summary.trim(),
      createdAt: timestamp,
      updatedAt:timestamp
    }
    //if the Book already exist with same author
    let existingRecord= await Books.findOne({title:createdData.title,author:createdData.author});
    if (existingRecord) {
      return res.status(400).json({
        status: 400,
        isError: true,
        message: 'This Book already exist.'
      });
    }
    const Book = await Books.create(createdData);
    return res.status(201).json({
      status: 201,
      data:Book,
      isError: false,
      message: "Book added successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      status: 500,
      isError: true,
      message: error.message || "Error occurred while creating the book."
    })
  }
});

/**
 * @route GET /api/book/view/all
 * @param {}
 * @description  this api is used for get all books records.
 * @author Abhijit swain
 */
bookRouter.get('/view/all', async (req, res) => {
  console.log('inside the view all list route')
  try {
    //if the Book already exist with same author
    let books = await Books.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      status: 200,
      data:books,
      isError: false,
      message: "Book fetched successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      status: 500,
      isError: true,
      message: error.message || "Error occurred while creating the book."
    })
  }
});

/**
 * @route GET /api/book/view
 * @param {id}
 * @description  this api is used for get book by it's unique id.
 * @author Abhijit swain
 */
bookRouter.get('/view', async (req, res) => {
  console.log('inside the view book by unique id route')
  try {
    //if the Book already exist with same author
    const _id = req.query.id;
    let books = await Books.findOne({ _id: _id });
    if (!books) {
      return res.status(404).json({
        status: 404,
        isError: true,
        message: "No such book found"
      })
    }
    return res.status(200).json({
      status: 200,
      data:books,
      isError: false,
      message: "Book fetched successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      status: 500,
      isError: true,
      message: error.message || "Error occurred while creating the book."
    })
  }
});

/**
 * @route GET /api/book/update
 * @param {id}
 * @description  this api is used for update  book's record by it's unique id.
 * @author Abhijit swain
 */
bookRouter.post('/update', async (req, res) => {
  console.log('inside the update book by unique id route')
  try {
    //if the Book already exist with same author
    const {id,title,summary,author} = req.body;
    if (!id) {
      return res.status(400).json({
        status: 400,
        isError: true,
        message: 'Please enter required field id'
      });
    }
    /**check if the book exist or not */
    let books = await Books.findOne({ _id: id });
    if (!books) {
      return res.status(404).json({
        status: 404,
        isError: true,
        message: "No such book found"
      })
    }
    const timestamp = Math.floor(Date.now() / 1000);
    let updatedData = {
      title: title.trim(),
      summary: summary.trim(),
      author: author.trim(),
      timestamp:timestamp
    }
    /**check if the entered book's details not duplicate  */
    let checkDuplicateRecord = await Books.findOne({ title: updatedData.title, author: updatedData.author, _id: { $ne: id } });
    if (checkDuplicateRecord) {
      return res.status(404).json({
        status: 404,
        isError: true,
        message: "this book have already exist."
      })
    }
    /**let update the record */
    await Books.updateOne({ _id: id }, updatedData);

    const book = await Books.find({ _id: id });

    return res.status(200).json({
      status: 200,
      data:book,
      isError: false,
      message: "Book updated successfully"
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      isError: true,
      message: error.message || "Error occurred while creating the book."
    })
  }
});
/**
 * @route GET /api/book/delete
 * @param {id}
 * @description  this api is used for delete a book.
 * @author Abhijit swain
 */
bookRouter.delete('/delete', async (req, res) => {
  console.log('inside the update book by unique id route')
  try {
    //if the Book already exist with same author
    const _id = req.query.id;
    let books = await Books.findOne({ _id: _id });
    if (!books) {
      return res.status(404).json({
        status: 404,
        isError: true,
        message: "No such book found"
      })
    }
    await Books.deleteOne({ _id: _id });
    return res.status(200).json({
      status: 200,
      data:books,
      isError: false,
      message: "Book deleted successfully"
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      isError: true,
      message: error.message || "Error occurred while creating the book."
    })
  }
});

module.exports =  bookRouter ;