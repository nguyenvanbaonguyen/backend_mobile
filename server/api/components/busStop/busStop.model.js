const mongoose = require("mongoose");
const mongoConnection = require("../../databases/mongo.connection");

const BusStop = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    routes: Array,
});

module.exports = mongoConnection.model("busStop", BusStop);
