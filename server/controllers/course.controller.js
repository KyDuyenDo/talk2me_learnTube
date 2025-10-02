const { courseQueue, questionQueue } = require("../queue/courseQueue");
const Course = require("../models/course");

const createCourse = async (req, res, next) => {
  try {
    const courseData = req.body;
    const { userId } = req.query;

    const job = await courseQueue.add("createCourse", {
      courseData,
      userId,
    },);

    res.status(202).json({
      message: "Course creation started",
      jobCourse: job.id,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCourseByUser = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, categoryId, search, sortBy = "createdAt", sortOrder = "desc" } = req.query;
    const { id } = req.user;

    const filter = {};
    if (categoryId) filter.categoryId = categoryId;
    if (search) filter.title = { $regex: search, $options: "i" };

    const courses = await Course.find(filter)
      .populate({
        path: "categoryId",
        match: { userId: id },
      })
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const filteredCourses = courses.filter(course => course.categoryId);

    const total = await Course.countDocuments({
      ...filter,
      ...(categoryId ? {} : { "categoryId.userId": id }),
    });

    return res.json({
      data: filteredCourses,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error("Error in getAllCourseByUser:", error);
    return res.status(500).json({ error: error.message });
  }
};




module.exports = {
  createCourse,
  getAllCourseByUser
}