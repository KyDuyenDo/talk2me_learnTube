const express = require("express");
const { signIn, logOut, refresh, createUser } = require("../controllers/user.controller");

const routes = express.Router();


routes.post("/create", createUser);
routes.post("/signin", signIn);
routes.get("/logout", logOut);
routes.get("/refresh", refresh);

module.exports = routes;
