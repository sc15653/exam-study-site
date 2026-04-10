import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY is missing. Add it to your .env file.")

client = OpenAI(api_key=api_key)


@app.route("/api/study", methods=["POST"])
def generate_study_guide():
    try:
        data = request.get_json()

        if not data or "topic" not in data:
            return jsonify({"error": "Topic is required."}), 400

        topic = data["topic"].strip()

        if not topic:
            return jsonify({"error": "Topic cannot be empty."}), 400

        prompt = f"""
You are an exam study assistant.

Generate a study guide for this topic: {topic}

Return valid JSON only in this exact structure:
{{
  "title": "Topic title",
  "explanation": "A clear beginner-friendly explanation",
  "keyPoints": ["point 1", "point 2", "point 3", "point 4", "point 5"],
  "questions": ["question 1", "question 2", "question 3", "question 4"],
  "codingTasks": ["task 1", "task 2", "task 3", "task 4"]
}}

Rules:
- Keep the explanation exam-focused
- Be clear and beginner-friendly
- If the topic is not programming, still return "codingTasks" as practical tasks related to the subject
- Return JSON only, no markdown, no extra text
"""

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt
        )

        text_output = response.output_text.strip()
        study_guide = json.loads(text_output)

        return jsonify(study_guide)

    except json.JSONDecodeError:
        return jsonify({
            "error": "The AI response was not valid JSON."
        }), 500

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)