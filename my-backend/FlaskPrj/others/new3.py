from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Replace with your TMDb API key
TMDB_API_KEY = 'ca9901ed0b27fbf0b06c7fa6a503cc88'

@app.route('/')
def index():
    return render_template('new3.html', movies=None)

@app.route('/search', methods=['GET'])
def search_movie():
    query = request.args.get('query')
    api_url = f'https://api.themoviedb.org/3/search/movie'
    params = {'api_key': TMDB_API_KEY, 'query': query}

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()

        # Extract and format movie data
        movies = [{'title': movie.get('title', ''), 'overview': movie.get('overview', '')} for movie in data.get('results', [])]

        return render_template('index.html', movies=movies)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
