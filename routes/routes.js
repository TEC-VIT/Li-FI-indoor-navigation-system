const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router(); //express router
const UserLocation = require('../schema/locationSchema') //get schema

// const newUserLocation = new UserLocation(data); //one instance of the model

//// Posting to MongoDB
// newUserLocation.save((error) => {
//     if (error) { console.log(error); }
//     else { console.log('Data saved!'); }
// });

// Getting data from MongoDB
routes.get('/', (req, res) => {
    UserLocation.find({})
        .then((data) => {
            // console.log("DATA:", data);
            res.json(data)
        })
        .catch((err) => {
            console.log("ERROR", err)
        })
})

//posting data to mongodb
routes.post('/', (req, res) => {
    const data = req.body;
    const newUserLocation = new UserLocation(data); //instance

    //save
    newUserLocation.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Sorry internal errors" })
        }
        else {
            res.status(200).json({ msg: "we recieved your data" })
        }
    })

})

module.exports = routes