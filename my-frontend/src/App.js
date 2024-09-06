import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/movies')  // Flask API URL
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title} ({movie.year})</li>
        ))}
      </ul>
    </div>
  );
};

export default App;