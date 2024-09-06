document.getElementById('search-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();

    if (query === '') {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = 'No results found.';
      return;
    }

    const apiKey = 'ca9901ed0b27fbf0b06c7fa6a503cc88';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';

      if (data.results.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
      } else {
        data.results.forEach(movie => {
          const movieElement = document.createElement('div');
          movieElement.classList.add('container-search', 'faq-section', 'padding-vertical', 'padding-x-small');

          const truncatedOverview = movie.overview.length > 300 ? movie.overview.substring(0, 300) + '...' : movie.overview;

          //onclick="displayMovieDetails(${movie.id});">${movie.title}</a><p>${movie.overview}</p>`;
          movieElement.innerHTML =
            `<div class="w-layout-grid-search">
                <div class="left-content-picture-search">
                  <div class="margin-small">
                    <img class="search-img" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" alt="poster">
                  </div>
                </div>
                <div class="comm-value_component-seach">
                  <div class="margin-small">
                    <a class="title" href="/movie-details?id=${movie.id}">${movie.title}</a>
                      <br><br>
                    <p id="movieOverview" class="movie-search-overview">${truncatedOverview}</p>
                  </div>
                </div> 
              </div>`;
          resultsContainer.appendChild(movieElement);
        });
      }
    } catch (error) {
      console.error('Error fetching data from TMDb:', error);
    }
  }); 