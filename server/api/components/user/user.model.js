const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoConnection = require("../../databases/mongo.connection");
const regex = require("../../modules/regex");

const Scheme = mongoose.Schema;

const User = new Scheme(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: (v) => {
                    return regex.email.test(v);
                },
                message: (props) => `${props.value} is not a valid email!`,
            },
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: (v) => {
                    return regex.phone.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        password: {
            type: String,
            required: true,
            min: [8, "Your password must have length >= 8"],
        },
        avatar: {
            type: String,
        },
        gender: {
            enum: ["male", "female"],
            type: String,
        },
        birthday: {
            type: Date,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

User.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

User.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

User.pre(/^find/, function (next) {
    this.select("-password");
    next();
});

User.pre(/^findOneAndUpdate/, async function (next) {
    if (!this._update?.password) return next();
    this._update.password = await bcrypt.hash(this._update.password, 12);
    next();
});

module.exports = mongoConnection.model("user", User);
