const Course = require("../models/course");


const createCourse = async (req, res, next) => {
    const { youtubeUrl, categoryId } = req.body;
    // call difference server to getting information
    const newCourse = Course({
        categoryId,
        youtubeUrl,
        title: "",
        subtitle: "",
        createdAt: "",
        thumbnail: ""
    })

    // call api to generate questions for quiz
    const quizQuestions = [{
        lessonPartId: "",
        type: "quiz",
        order: 1,
        prompt: "1+1 = ?",
        choices: ["2", "3", "4", "6"],
        correctIndex: 1,
        referenceAnswer: "explanation",
        createdAt: "22/12/2025"
    }]


    // cal api to generate questions for writing
    const writingQuestions = [{
        lessonPartId: "",
        type: "writing",
        order: 1,
        prompt: "Describe a cat",
        referenceAnswer: "Black cat",
        createdAt: "22/12/2025"
    }]

    // call api to generate questions for speaking
    const speakingQuestions = [{
        lessonPartId: "",
        type: "speaking",
        order: 1,
        prompt: "Describe a cat",
        referenceAnswer: "Black cat",
        createdAt: "22/12/2025"
    }]



    newCourse.save();

};