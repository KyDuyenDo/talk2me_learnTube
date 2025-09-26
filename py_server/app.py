import os
from flask import Blueprint, Flask, abort, jsonify, request
from dotenv import load_dotenv
from agent import QuestionGenerator
from youtube_transcript_api import YouTubeTranscriptApi
from flask_cors import CORS
import yt_dlp


load_dotenv(override=True)
gen = QuestionGenerator()

app = Flask(__name__)
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization", "X-API-KEY", "Cache-Control"]
)


# setting server
api_generate = Blueprint("api_generate", __name__)

# main api
@api_generate.before_request
def check_api_key():
    if request.method == "OPTIONS":
        return None  
    key = request.headers.get("X-API-KEY")
    if key != os.getenv("PRIVATE_API_KEY"):
        abort(403, description="Forbidden: Invalid API key")

@api_generate.route("/quiz", methods=["POST"])
def generate_quiz():
    data = request.get_json() or {}
    youtube_url = data.get("youtubeUrl", "").strip()
    if not youtube_url:
        return jsonify({"error": "youtubeUrl is required"}), 400

    transcript = get_transcript(youtube_url, max_minutes=10)
    quizset = gen.generate_quiz(transcript)
    quiz_nodes = gen.to_node_format_quiz(quizset)

    return jsonify({"message": "Received", "questions": quiz_nodes})

@api_generate.route('/writing', methods=["POST"])
def generate_writing():
    
    return 'Hello, World!'

@api_generate.route('/speaking', methods=["POST"])
def generate_speaking():
    
    return 'Hello, World!'

@api_generate.route('/youtube-info', methods=["POST"])
def get_info_youtubeUrl():
    try:
        data = request.get_json()
        youtube_url = data.get("youtubeUrl")
        if not youtube_url:
            return jsonify({"error": "youtubeUrl is required"}), 400

        with yt_dlp.YoutubeDL({}) as ydl:
            info_dict = ydl.extract_info(youtube_url, download=False)

        transcript = get_transcript(youtube_url, max_minutes=10)

        info = {
            "title": info_dict.get("title", ""),
            "thumbnail": info_dict.get("thumbnail", ""),
            "channel": info_dict.get("channel", ""),
            "transcript": transcript
        }
        return jsonify(info), 200

    except Exception as e:
        import traceback
        print("Error:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500




@api_generate.route('/theory/quiz', methods=["POST"])
def theory_quiz():
    """
    Placeholder endpoint for generating quiz theory from YouTube content.
    Expect JSON: { "youtubeUrl": "https://..." }
    """
    data = request.get_json() or {}
    youtube_url = data.get("youtubeUrl", "").strip()

    if not youtube_url:
        return jsonify({"error": "youtubeUrl is required"}), 400

    # TODO: Implement logic for theory quiz generation
    # transcript = get_transcript(video_id, max_minutes=10)
    # result = your_logic(transcript)

    return jsonify({"message": "Theory quiz endpoint placeholder"}), 200


@api_generate.route('/theory/writing', methods=["POST"])
def theory_writing():
    """
    Placeholder endpoint for generating writing theory from YouTube content.
    Expect JSON: { "youtubeUrl": "https://..." }
    """
    data = request.get_json() or {}
    youtube_url = data.get("youtubeUrl", "").strip()

    if not youtube_url:
        return jsonify({"error": "youtubeUrl is required"}), 400

    # TODO: Implement logic for theory writing generation

    return jsonify({"message": "Theory writing endpoint placeholder"}), 200


@api_generate.route('/theory/speaking', methods=["POST"])
def theory_speaking():
    """
    Placeholder endpoint for generating speaking theory from YouTube content.
    Expect JSON: { "youtubeUrl": "https://..." }
    """
    data = request.get_json() or {}
    youtube_url = data.get("youtubeUrl", "").strip()

    if not youtube_url:
        return jsonify({"error": "youtubeUrl is required"}), 400

    # TODO: Implement logic for theory speaking generation

    return jsonify({"message": "Theory speaking endpoint placeholder"}), 200


# method

def get_transcript(youtube_url: str, max_minutes: int = 10) -> str:
    """
    Fetch transcript from YouTube video URL (not just video_id).
    Automatically extracts video_id.
    Returns transcript as a single string (up to max_minutes).
    """
    # --- extract video_id ---
    video_id = None
    if "v=" in youtube_url:
        video_id = youtube_url.split("v=")[1].split("&")[0]
    elif "youtu.be/" in youtube_url:
        video_id = youtube_url.split("youtu.be/")[1].split("?")[0]
    if not video_id:
        raise ValueError("Invalid YouTube URL")

    # --- fetch transcript ---
    ytt_api = YouTubeTranscriptApi()
    data = ytt_api.fetch(video_id)
    transcript = data.to_raw_data()

    max_seconds = max_minutes * 60
    limited_transcript = [
        entry["text"]
        for entry in transcript
        if entry["start"] <= max_seconds and entry["text"].strip() != ""
    ]

    return " ".join(limited_transcript)



app.register_blueprint(api_generate, url_prefix="/api/generate")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)