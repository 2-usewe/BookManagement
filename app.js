const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { dbConnect } = require('./config/db');
const  bookRouter  = require('./api/controllers/CrudBook');

dotenv.config();
dbConnect();
app.use(express.json()); // for parsing application/json

const PORT = process.env.PORT ;
console.log(PORT);

app.use('/api/book', bookRouter);

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
});


