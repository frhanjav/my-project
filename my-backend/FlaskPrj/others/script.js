function alertUser() {
    alert('Hey, you clicked the button!')
}

function openAnotherHTML() {
    var url = 'success';
    window.location.href = url;
}

function goBack() {
    window.history.back();
}

// Attach the event listener to the button with the id 'openButton'
document.getElementById('openButton').addEventListener('click', openAnotherHTML);


const apiKey = 'ca9901ed0b27fbf0b06c7fa6a503cc88';
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a search query.');
        return;
    }

    // Construct the API URL for searching movies or TV shows
    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`;

    // Make the API request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the API response and display results
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data from TMDb:', error);
        });
});

function displayResults(data) {
    // Clear previous results
    resultsContainer.innerHTML = '';

    if (data.results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Loop through the results and display them
    data.results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `
            <h2>${result.title || result.name}</h2>
            <p>${result.overview}</p>
        `;
        resultsContainer.appendChild(resultElement);
    });
}
