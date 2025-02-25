Movie Search App
This is a React-based application that allows users to search for movies and view details about them. It fetches popular movies from an API and allows users to search for movies based on a query. The app uses state management and handles asynchronous API calls.

Features
Search Movies: Users can search for movies by title.
Display Popular Movies: Fetches and displays a list of popular movies when the app loads.
Loading Indicator: Displays a loading message while fetching data.
Error Handling: Displays an error message if something goes wrong during the API request.
Movie Cards: Each movie is displayed with a card component showing key details.
Dependencies
This project uses the following dependencies:

react: For building the UI.
useState, useEffect: For state management and side effects handling.
MovieCard: A custom component to display movie details.
searchMovies, getPopularMovie: Functions for fetching movie data from an external API.
Setup
Clone the repository.
Install the necessary dependencies:
bash
Copy
Edit
npm install
Run the application:
bash
Copy
Edit
npm start
Open the browser and navigate to http://localhost:3000 to view the app.
Code Walkthrough
useState and useEffect
useState is used to manage the state of the search query, movie list, loading state, and error state.
useEffect fetches the list of popular movies when the component is first mounted. It calls the getPopularMovie function and updates the movie list in state.
handleSearch Function
The handleSearch function is triggered when the user submits the search form. It prevents the default form submission behavior with e.preventDefault(), checks for empty or whitespace-only search queries, and handles the API call for searching movies using the searchMovies function.
Error and Loading States
If the API request fails, the error state is updated and displayed on the UI.
While the data is being fetched, a loading indicator is shown to the user.
Once the data is loaded, the movies are displayed using the MovieCard component.
Example
jsx
Copy
Edit
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovie } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovie();
        setMovies(popularMovies);
      } catch (err) {
        setError("Error fetching popular movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResult = await searchMovies(searchQuery);
      setMovies(searchResult);
      setError(null);
    } catch (err) {
      setError("Error searching movies");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id} />
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
Contributing
Feel free to fork this repository and submit pull requests with improvements or bug fixes.

License
This project is licensed under the MIT License.
 
 
