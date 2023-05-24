const mongoose = require("mongoose");
const mongoConnection = require("../../databases/mongo.connection");

const Route = new mongoose.Schema({
    number: {
        type: String,
        unique: true,
    },
    name: String,
    startTime: String,
    endTime: String,
    price: Number,
    priceForStudent: Number,
    type: String,
    minRunTime: Number,
    maxRunTime: Number,
    routeQuantity: Number,
    distanceTime: Number,
    schedules: Array,
    destinations: Array,
});

module.exports = mongoConnection.model("route", Route);
