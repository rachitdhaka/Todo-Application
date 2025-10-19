const express = require('express');
const app = express();
const JWT = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');

const { UserRouter } = require('./Routes/User')
const { TodoRouter } = require('./Routes/Todo')
app.use(cors());
app.use(express.json());

// user router - Login and Signup
app.use('/user' , UserRouter);
app.use('/todo' , TodoRouter);



app.get("/" , function(req, res){
    res.send("Rachit Backend Chal raha hai")
})
app.listen(3000);
