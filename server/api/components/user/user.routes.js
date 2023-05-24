const express = require("express");

const PhotoHandler = require("../../modules/Photo");
const { authUser } = require("../auth/auth.controller");
const { getMe, updateMe } = require("./user.controller");

const handlerPhoto = new PhotoHandler("users", "user");
const uploadPhotoChain = handlerPhoto.chainHandlePhoto("avatar", 300);

const userRoute = express.Router();

userRoute.use(authUser);

userRoute
    .route("/me")
    .get(getMe)
    .put(...uploadPhotoChain, updateMe);

module.exports = userRoute;
