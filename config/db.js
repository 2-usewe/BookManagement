const mongoose = require('mongoose');
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log('db connected!');
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {dbConnect};