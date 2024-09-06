from flask import Flask, render_template, request, redirect, url_for
import sqlite3, requests

app = Flask(__name__)

TMDB_API_KEY = 'ca9901ed0b27fbf0b06c7fa6a503cc88'

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/success")
def success():
    return render_template("success.html")

@app.route("/registrants")
def registrants():
    return render_template("registrants.html")

@app.route('/api')
def api():
    # Fetch data from the TMDb API
    query = 'Avengers'  # Example search query
    url = f'https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={query}'
    response = requests.get(url)
    data = response.json()

    # Extract the movie results
    movies = data.get('results', [])

    # Render an HTML template with the movie data
    return render_template('api.html', movies=movies)


# ca9901ed0b27fbf0b06c7fa6a503cc88 : api key
# eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTk5MDFlZDBiMjdmYmYwYjA2YzdmYTZhNTAzY2M4OCIsInN1YiI6IjY0YzQwYjlmZTNmYTJmMDBmZjAzMzljNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._PoK_rSUxUGOtY7m8QauUwfzrq0081EErr1Zoc64F_Q : read access token
@app.route('postjson', methods = ['POST'])
def postJsonHandler():
    print (request.is_json)
    content = request.get_json()
    print (content)
    return 'JSON posted'

if __name__ == "__main__":
    app.run(port=8000, debug=True)
