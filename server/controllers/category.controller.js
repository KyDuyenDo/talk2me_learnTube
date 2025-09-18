const Category = require("../models/category");
const Course = require("../models/course");

const createCategory = async (req, res, next) => {
    try {
        const { label, userId } = req.body;
        // const userId = req.user._id;

        if (!label) {
            return res.status(400).json({ message: "Label is required" });
        }

        const category = new Category({ label, userId });
        await category.save();

        res.status(201).json({ message: "Category created", category });
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const categories = await Category.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};


const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const relatedCourses = await Course.find({ categoryId: id }).limit(1);
        if (relatedCourses.length > 0) {
            return res.status(400).json({
                message: "Cannot delete category. There are courses linked to it."
            });
        }

        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createCategory,
    getCategories,
    deleteCategory
}