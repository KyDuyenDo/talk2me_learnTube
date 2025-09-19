const createCourse = async (req, res, next) => {
  try {
    const courseData = req.body;
    const { socketId } = req.query;

    const job = await courseQueue.add("createCourse", {
      courseData,
      socketId,
    });

    res.status(202).json({
      message: "Course creation started",
      jobId: job.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createCourse
}