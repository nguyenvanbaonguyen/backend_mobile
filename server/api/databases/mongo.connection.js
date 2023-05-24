const mongoose = require("mongoose");
const { MONGO_HOST, MONGO_PORT, MONGO_NAME, MONGO_PASSWORD } = require("../../config");

function newConnection(uri) {
    const conn = mongoose.createConnection(uri, {
        useNewUrlParser: true,
    });

    conn.on("connected", () => {
        console.log("MongoDB connected " + conn.name);
        if (process.env.NODE_ENV === "development") {
            mongoose.set("debug", (table, method, query, doc) => {
                console.log(`MongoDB Debug: ${conn.name}:${table}.${method}(${JSON.stringify(query)})`);
            });
        }
    });

    conn.on("disconnected", () => {
        console.log("MongoDB disconnected ");
    });

    conn.on("error", (error) => {
        console.log(`MongoDB error ${JSON.stringify(error)}`);
        conn.close().catch(() => console.log(`MongoDB: Fail to close connection ${conn.name}`));
    });
    return conn;
}

// const URI_MONGO = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;
const URI_MONGO = `mongodb+srv://bmin:${MONGO_PASSWORD}@baonguyendb.4atnpkc.mongodb.net/mobile_backend`;

const mongoConnection = newConnection(URI_MONGO);

module.exports = mongoConnection;
