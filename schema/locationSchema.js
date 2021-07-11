const mongoose = require('mongoose');

let time = Date.now();
let date_ob = new Date(time);

let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
console.log();
const Schema = mongoose.Schema;
const UserLocationSchema = new Schema({
    location: String,
    date: {
        type: String,
        default: date + "/" + month + "/" + year
    },
    time: {
        type: String,
        default: hours + ":" + minutes + ":" + seconds
    }
});

// model
const UserLocation = mongoose.model('UserLocation', UserLocationSchema)

module.exports = UserLocation