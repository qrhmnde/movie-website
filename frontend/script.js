// script.js

const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchMovies(endpoint, containerId) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const movies = data.results;

        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear previous content

        movies.forEach(movie => {
            const movieElement = document.createElement('img');
            movieElement.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
            movieElement.alt = movie.title;
            movieElement.classList.add('movie-poster'); // Add a class for styling
            movieElement.addEventListener('click', () => showMovieDetails(movie.id)); // Add click event
            container.appendChild(movieElement);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
        // Handle error (e.g., display an error message)
    }
}

async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const movieDetails = await response.json();

        // Create a modal or a separate section to display movie details
        const modal = document.createElement('div');
        modal.classList.add('movie-modal');

        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2>${movieDetails.title}</h2>
                <img src="${IMAGE_BASE_URL}${movieDetails.poster_path}" alt="${movieDetails.title}">
                <p>${movieDetails.overview}</p>
                <p>Release Date: ${movieDetails.release_date}</p>
                <p>Rating: ${movieDetails.vote_average}</p>
                </div>
        `;

        document.body.appendChild(modal);

        // Add close button functionality
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            modal.remove();
        });

        // Close the modal when clicking outside of it.
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
            }
        });

    } catch (error) {
        console.error('Error fetching movie details:', error);
        // Handle error (e.g., display an error message)
    }
}

// Search functionality
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keydown', (event) => {if (event.key === "Enter"){performSearch()}});

async function performSearch() {
    const query = searchInput.value;
    if (query) {
        try {
            const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const searchResults = data.results;

            const searchResultsContainer = document.getElementById('popular'); //Using popular as a temporary container.
            searchResultsContainer.innerHTML = ''; //clear previous results.

            searchResults.forEach(movie => {
                const movieElement = document.createElement('img');
                movieElement.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
                movieElement.alt = movie.title;
                movieElement.classList.add('movie-poster');
                movieElement.addEventListener('click', () => showMovieDetails(movie.id));
                searchResultsContainer.appendChild(movieElement);
            });
        } catch (error) {
            console.error('Search error:', error);
        }
    }
}

// Initial movie fetching
fetchMovies('/trending/movie/week', 'trending');
fetchMovies('/movie/popular', 'popular');
fetchMovies('/discover/movie?with_genres=28', 'action'); // Action movies