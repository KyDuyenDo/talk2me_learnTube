import os
from flask import Blueprint, Flask, abort, jsonify, request
from dotenv import load_dotenv
from agent import QuestionGenerator
from youtube_transcript_api import YouTubeTranscriptApi
import yt_dlp


load_dotenv(override=True)
gen = QuestionGenerator()
app = Flask(__name__)

# setting server
api_generate = Blueprint("api_generate", __name__)

# main api
@api_generate.before_request
def check_api_key():
    key = request.headers.get("X-API-KEY")
    if key != os.getenv("PRIVATE_API_KEY"):
        abort(403, description="Forbidden: Invalid API key")

@api_generate.route('/quiz', methods=["POST"])
def generate_quiz():
    data = request.get_json() or {}  
    youtube_url = data.get("youtubeUrl", "").strip()
    
    if not youtube_url:
        return jsonify({"error": "youtubeUrl is required"}), 400

    if "v=" in youtube_url:
        youtube_id = youtube_url.split("v=")[1].split("&")[0]
    elif "youtu.be/" in youtube_url:
        youtube_id = youtube_url.split("youtu.be/")[1].split("?")[0]
    else:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    transcript = get_transcript(youtube_id, 10)
    
    quizset = gen.generate_quiz(transcript)
    quiz_nodes = gen.to_node_format_quiz(quizset)
    

    return jsonify({"message": "Received", "questions": quiz_nodes})

@api_generate.route('/writing', methods=["POST"])
def generate_writing():
    
    return 'Hello, World!'

@api_generate.route('/speaking', methods=["POST"])
def generate_speaking():
    
    return 'Hello, World!'

@api_generate.route('/info', methods=["POST"])
def get_info_youtubeUrl():
    try:
        data = request.get_json()
        youtube_url = data.get("youtubeUrl")

        if not youtube_url:
            return jsonify({"error": "youtubeUrl is required"}), 400

        ydl_opts = {}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(youtube_url, download=False)

        info = {
            "title": info_dict.get("title", ""),
            "thumbnail": info_dict.get("thumbnail", "")
        }

        return jsonify(info), 200

    except Exception as e:
        import traceback
        print("Error:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500


# method
def get_transcript(video_id: str, max_minutes: int) -> str:
    """
    Fetch transcript from YouTube video and join into one text.
    :param video_id: YouTube video ID (e.g. "dQw4w9WgXcQ")
    :return: Full transcript as a single string
    """
    ytt_api = YouTubeTranscriptApi()
    data = ytt_api.fetch(video_id)
    transcript = data.to_raw_data()
    
    max_seconds = max_minutes * 60
    limited_transcript = [
        entry['text'] 
        for entry in transcript 
        if entry['start'] <= max_seconds and entry['text'].strip() != ''
    ]
    
    full_text = " ".join(limited_transcript)
    
    return full_text


app.register_blueprint(api_generate, url_prefix="/api/generate")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)