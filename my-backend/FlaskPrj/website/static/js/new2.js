const addToWatchlistButton = document.getElementById('addToWatchlist');

addToWatchlistButton.addEventListener('click', async () => {
  const movieId = getMovieIdFromSomewhere(); // Replace with your logic to get ID
  const userId = getUserId(); // Replace with logic to get user ID (if needed)

  const response = await fetch('/addToWatchlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieId, userId }), // Send movie ID and potentially user ID
  });

  // Handle the response from the backend (optional)
  if (response.ok) {
    console.log('Movie added to watchlist successfully!');
  } else {
    console.error('Error adding movie to watchlist!');
  }
});

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTk5MDFlZDBiMjdmYmYwYjA2YzdmYTZhNTAzY2M4OCIsInN1YiI6IjY0YzQwYjlmZTNmYTJmMDBmZjAzMzljNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._PoK_rSUxUGOtY7m8QauUwfzrq0081EErr1Zoc64F_Q'
  }
};

fetch('https://api.themoviedb.org/3/account/account_id/watchlist', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

if (response.ok) {
  console.log('Movie added to watchlist successfully!');
} else {
  console.error('Error adding movie to watchlist!');
}