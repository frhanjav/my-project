from flask import Blueprint, render_template, request, flash, jsonify, redirect, url_for, session
import requests
from flask_login import login_required, current_user
from .models import Note, Movie, Watchlist, User
from . import db
import json
from .models import Watchlist, db

TMDB_API_KEY = 'ca9901ed0b27fbf0b06c7fa6a503cc88'
tmdb_api_key = 'ca9901ed0b27fbf0b06c7fa6a503cc88'

views = Blueprint('views', __name__)

@views.route('/')
def index():
    return render_template('home_page.html', user=current_user)

@views.route('/about')
def about():
    return render_template('about.html', user=current_user)

@views.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@views.route('/search_movie')
def find_movie():
    return render_template('search_movie.html', user=current_user)

@views.route('/search_tv')
def find_tv():
    return render_template('search_tv.html', user=current_user)

@views.route('/movie-search')
def find_api():
    return render_template('movie_search.html', user=current_user)

@views.route('/tv-search')
def find_api2():
    return render_template('tv_search.html', user=current_user)

@views.route('/movie-details', methods=['GET'])
def movie_details():
    movie_id = request.args.get('id')
    
    if not movie_id:
        return render_template('error.html', message='Movie ID is required', user=current_user)

    tmdb_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}&language=en-US'
    
    try:
        response = requests.get(tmdb_url)
        response.raise_for_status()  # Check for HTTP errors
        movie_data = response.json()
    except requests.exceptions.RequestException as e:
        movie_data = {'error': str(e)}
    
    return render_template('movie_details.html', movie_data=movie_data, user=current_user, movie_id=movie_id)

@views.route('/series-details', methods=['GET'])
def series_details():
    series_id = request.args.get('id')
    
    if not series_id:
        return render_template('error.html', message='Series ID is required', user=current_user)

    tmdb_url = f'https://api.themoviedb.org/3/tv/{series_id}?api_key={tmdb_api_key}&language=en-US'
    
    try:
        response = requests.get(tmdb_url)
        response.raise_for_status()  # Check for HTTP errors
        series_data = response.json()
    except requests.exceptions.RequestException as e:
        series_data = {'error': str(e)}
    
    return render_template('series_details.html', series_data=series_data, user=current_user)

# @views.route('/watchlist')
# def watchlist():
    
#     # Read the watchlist from the file or query it from the database
#     with open('watchlist.txt', 'r') as file:
#         watchlist = [line.strip() for line in file]

#     return render_template('watchlist.html', user=current_user)

@views.route('/add_to_watchlist/<int:movie_id>', methods=['POST'])
@login_required
def add_to_watchlist(movie_id):
    movie = Movie.query.get(movie_id)
    if movie:
        watchlist_entry = Watchlist.query.filter_by(user_id=current_user.id, movie_id=movie_id).first()
        if watchlist_entry:
            flash('Movie already in watchlist!', category='error')
        else:
            new_watchlist_entry = Watchlist(user_id=current_user.id, movie_id=movie_id)
            db.session.add(new_watchlist_entry)
            db.session.commit()
            flash('Movie added to watchlist!', category='success')
    else:
        flash('Movie not found!', category='error')
    return redirect(url_for('views.movie_page', movie_id=movie_id))

@views.route('/watchlist')
@login_required
def watchlist():
    watchlisted_movies = Movie.query.join(Watchlist).filter(Watchlist.user_id == current_user.id).all()
    return render_template('watchlist.html', movies=watchlisted_movies, user=current_user)

@views.route('/connect', methods = ['GET', 'POST'])
@login_required
def connect():
    if request.method == 'POST': 
        note = request.form.get('note')#Gets the note from the HTML 

        if len(note) < 1:
            flash('Note is too short!', category='error') 
        else:
            new_note = Note(data=note, user_id=current_user.id)  #providing the schema for the note 
            db.session.add(new_note) #adding the note to the database 
            db.session.commit()
            flash('Note added!', category='success')
    return render_template('connect.html', user=current_user)

@views.route('/delete-note', methods=['POST'])
def delete_note():  
    note = json.loads(request.data) # this function expects a JSON from the INDEX.js file 
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})