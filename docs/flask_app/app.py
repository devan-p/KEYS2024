from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'ADD KEY HEREYY'  # Replace with your actual OpenAI API key