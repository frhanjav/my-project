document.getElementById('search-form-tv')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input-tv').value.trim();

    if (query === '') {
      const resultsContainer = document.getElementById('results-tv');
      resultsContainer.innerHTML = 'No results found.';
      return;
    }

    const apiKey = 'ca9901ed0b27fbf0b06c7fa6a503cc88';
    const apiUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const resultsContainerTv = document.getElementById('results-tv');
      resultsContainerTv.innerHTML = '';

      if (data.results.length === 0) {
        resultsContainerTv.innerHTML = 'No results found.';
      } else {
        data.results.forEach(tvShow => {
          const tvShowElement = document.createElement('div');
          tvShowElement.classList.add('container-search', 'faq-section', 'padding-vertical', 'padding-x-small');

          const truncatedOverview = tvShow.overview.length > 300 ? tvShow.overview.substring(0, 300) + '...' : tvShow.overview;
          
          tvShowElement.innerHTML = 
          `<div class="w-layout-grid-search">
              <div class="left-content-picture-search">
                <div class="margin-small">
                  <img class="search-img" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${tvShow.poster_path}" alt="poster">
                </div>
              </div>
              <div class="comm-value_component-seach">
                <div class="margin-small">
                  <a class="title" href="/series-details?id=${tvShow.id}">${tvShow.name}</a>
                    <br><br>
                  <p id="movieOverview" class="movie-search-overview">${truncatedOverview}</p>
                </div>
              </div>
            </div>`;
          resultsContainerTv.appendChild(tvShowElement);
        });
      }
    } catch (error) {
      console.error('Error fetching data from TMDb for TV shows:', error);
    }
  });