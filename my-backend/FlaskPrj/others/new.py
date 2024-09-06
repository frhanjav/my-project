from flask import Flask, render_template, request, jsonify, redirect, url_for
import requests

app = Flask(__name__)

TMDB_API_KEY = 'ca9901ed0b27fbf0b06c7fa6a503cc88'

@app.route('/')
def index():
    return render_template('home_page.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/connect')
def connect():
    return render_template('connect.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/search_movie')
def find_movie():
    return render_template('search_movie.html')

@app.route('/search_tv')
def find_tv():
    return render_template('search_tv.html')

@app.route('/api')
def find_api():
    return render_template('new.html')

@app.route('/api2')
def find_api2():
    return render_template('new2.html')

@app.route('/movie-details', methods=['GET'])
def movie_details():
    # Get the movie ID from the query parameter 'id'
    movie_id = request.args.get('id')
    
    if not movie_id:
        return render_template('error.html', message='Movie ID is required')

    # Define the TMDB API URL with the provided movie ID
    tmdb_api_key = 'ca9901ed0b27fbf0b06c7fa6a503cc88'  # Replace with your TMDB API key
    tmdb_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}&language=en-US'
    
    try:
        response = requests.get(tmdb_url)
        response.raise_for_status()  # Check for HTTP errors
        movie_data = response.json()
    except requests.exceptions.RequestException as e:
        movie_data = {'error': str(e)}
    
    return render_template('movie_details.html', movie_data=movie_data)

@app.route('/series-details', methods=['GET'])
def series_details():
    # Get the movie ID from the query parameter 'id'
    series_id = request.args.get('id')
    
    if not series_id:
        return render_template('error.html', message='Series ID is required')

    # Define the TMDB API URL with the provided movie ID
    tmdb_api_key = 'ca9901ed0b27fbf0b06c7fa6a503cc88'  # Replace with your TMDB API key
    tmdb_url = f'https://api.themoviedb.org/3/tv/{series_id}?api_key={tmdb_api_key}&language=en-US'
    
    try:
        response = requests.get(tmdb_url)
        response.raise_for_status()  # Check for HTTP errors
        series_data = response.json()
    except requests.exceptions.RequestException as e:
        series_data = {'error': str(e)}
    
    return render_template('series_details.html', series_data=series_data)

if __name__ == "__main__":
    app.run(port=8000, debug=True)