const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/routes')
const pythonroutes = require('./routes/pythonroute')
const PORT = process.env.PORT || 8080;

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//connect mongoose
const MONGODB_URI = "mongodb+srv://business-admin:businessadmin@pathdb.tol12.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});


app.use('/', routes); //routing to routes.js
app.use('/python', pythonroutes)
app.use(morgan('tiny')); //HTTP request logger

// if (process.env.NODE_ENV === 'production') {} //for front end

app.listen(PORT, console.log(`Server is starting at port: ${PORT}`));