import os
import time
import tempfile
import json
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
    
    if not transcript:
        return jsonify({"error": "Failed to extract transcript. Connection may be blocked by YouTube."}), 400
    
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
        
        if "v=" in youtube_url:
            youtube_id = youtube_url.split("v=")[1].split("&")[0]
        elif "youtu.be/" in youtube_url:
            youtube_id = youtube_url.split("youtu.be/")[1].split("?")[0]
        else:
            return jsonify({"error": "Invalid YouTube URL"}), 400

        ydl_opts = {}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(youtube_url, download=False)

        transcript = get_transcript(youtube_id, 10)
        
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
    data = request.get_json() or {}
    transcript = data.get("transcript", "").strip()

    if not transcript:
        return jsonify({"error": "transcript is required"}), 400
    
    theory = gen.generate_quiz_theory(transcript)

    return jsonify({"theory": theory}), 200


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


# Transcript cache to prevent IP blocking
transcript_cache = {}

# method
def get_transcript(video_id: str, max_minutes: int) -> str:
    """
    Fetch transcript from YouTube video and join into one text.
    Includes caching, delays, and a yt-dlp fallback to prevent IP Blocks.
    :param video_id: YouTube video ID (e.g. "dQw4w9WgXcQ")
    :return: Full transcript as a single string
    """
    transcript = None
    
    # 1. Check Cache
    if video_id in transcript_cache:
        transcript = transcript_cache[video_id]
        print(f"Using cached transcript for {video_id}")
    else:
        try:
            # 2. Add delay to protect against rate limits during continuous generation
            time.sleep(1)
            
            # 3. Try youtube_transcript_api first
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            transcript_cache[video_id] = transcript
            print(f"Successfully fetched transcript via youtube_transcript_api for {video_id}")
            
        except Exception as e:
            print(f"youtube_transcript_api failed for {video_id}: {e}")
            print("Attempting to fallback to yt-dlp...")
            
            try:
                # 4. Fallback to yt-dlp if it's an IP Block or other error
                with tempfile.TemporaryDirectory() as tmpdir:
                    ydl_opts = {
                        'skip_download': True,
                        'writesubtitles': True,
                        'writeautomaticsub': True,
                        'subtitleslangs': ['en'],
                        'subtitlesformat': 'json3',
                        'outtmpl': f'{tmpdir}/%(id)s.%(ext)s',
                        'quiet': True,
                    }
                    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                        ydl.extract_info(f"https://www.youtube.com/watch?v={video_id}", download=True)
                    
                    # Read the downloaded json3 subtitle
                    for fname in os.listdir(tmpdir):
                        if fname.endswith('.json3'):
                            with open(os.path.join(tmpdir, fname), 'r', encoding='utf-8') as f:
                                data = json.load(f)
                                transcript = []
                                for event in data.get('events', []):
                                    segs = event.get('segs', [])
                                    text = "".join([s.get('utf8', '') for s in segs if 'utf8' in s])
                                    if text.strip():
                                        start_ms = event.get('tStartMs', 0)
                                        transcript.append({'text': text.strip(), 'start': start_ms / 1000.0})
                            break
                            
                if transcript:
                    transcript_cache[video_id] = transcript
                    print(f"Successfully fetched transcript via yt-dlp for {video_id}")
                else:
                    raise Exception("No transcript could be parsed from yt-dlp download")
                    
            except Exception as fallback_err:
                print(f"yt-dlp fallback also failed: {fallback_err}")
                return ""

    if not transcript:
        return ""
        
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