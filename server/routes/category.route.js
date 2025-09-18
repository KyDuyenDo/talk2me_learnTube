const express = require("express");
const {
    createCategory,
    getCategories,
    getCategoryById,
    deleteCategory
} = require("../controllers/category.controller.js");
// import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Middleware auth áp dụng cho tất cả routes
// router.use(authMiddleware);

router.post("/", createCategory);

router.get("/", getCategories);

router.delete("/:id", deleteCategory);

module.exports = router;
