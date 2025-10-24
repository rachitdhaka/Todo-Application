const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
// Load environment variables from .env
require('dotenv').config();

// Use MONGO_URL from environment, fallback to local MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/todo-app';

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Exit the process if we can't connect in a server app
    process.exit(1);
  });



const User = new Schema({
    email: {
        type : String ,
        required : true ,
        unique: true
    },
    password: {
        type : String ,
        required : true ,
    },
    name :{
        type : String ,
        required : true
    }
})


const Todo = new Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  userId: {
    type: ObjectId,
    required: false
  },
  priority: {
    type: String,
    required : true
  },
  description: {
    type: String,
    required: true
  }

})

const UserModel = mongoose.model('users' , User);
const TodoModel = mongoose.model('todos' , Todo);

module.exports={
    UserModel,
    TodoModel
}
