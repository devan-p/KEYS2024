from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'ADD KEY HERE'  # Replace with your actual OpenAI API key