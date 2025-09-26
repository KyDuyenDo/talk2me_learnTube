const axios = require("axios");

async function fetchExternalCourseInfo(youtubeUrl) {
    const res = await axios.post(
        "http://127.0.0.1:5000/api/generate/youtube-info",
        { youtubeUrl },
        {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "12345",
            },
            timeout: 15000,
        }
    );
    return {
        title: res.data.title,
        thumbnail: res.data.thumbnail,
        transcript: res.data.transcript,
        channel: res.data.channel
    };
}

async function fetchQuestionsFromAI(youtubeUrl) {
    const res = await axios.post(
        "http://127.0.0.1:5000/api/generate/quiz",
        { youtubeUrl },
        {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "12345",
            },
        }
    );
    return res.data.questions;
}

async function fetchQuizTheoryFromAI(transcript) {
    const res = await axios.post(
        "http://127.0.0.1:5000/api/generate/theory/quiz",
        { transcript },
        {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "12345",
            },
        }
    );
    return res.data.questions;
}

module.exports = { fetchExternalCourseInfo, fetchQuestionsFromAI, fetchQuizTheoryFromAI };
