const express = require("express");
const authMiddleware = require("../middlewares/auth")
const { 
    signIn, 
    logOut, 
    refresh, 
    createUser, 
    getInfoUser, 
    changeInfo,
    changePassWord,
    deleteUser
} = require("../controllers/user.controller");


const routes = express.Router();


routes.post("/create", createUser);
routes.post("/signin", signIn);
routes.get("/logout", logOut);
routes.get("/refresh", refresh);
routes.get('/getInfoUser',authMiddleware, getInfoUser)
routes.put("/changePassWord", authMiddleware, changePassWord)
routes.put("/changeInfo", authMiddleware, changeInfo)
routes.delete("/deleteUser", authMiddleware, deleteUser)

module.exports = routes;
