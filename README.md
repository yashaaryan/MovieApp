
# Movie Search App

A React app that allows users to search for movies and view details. It fetches popular movies from an API and supports search functionality.

## Features
- Search movies by title.
- Displays popular movies on load.
- Handles loading state and errors.

## Setup
1. Clone the repo.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```
4. Visit `http://localhost:3000` in the browser.

## Code Walkthrough
- `useState` for managing search query, movies, loading, and error states.
- `useEffect` to fetch popular movies on mount.
- `handleSearch` for searching movies based on the query.

## Example
```jsx
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovie } from "../services/api";
import MovieCard from "../components/MovieCard";

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
      } catch {
        setError("Error fetching popular movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;
    setLoading(true);
    try {
      const searchResult = await searchMovies(searchQuery);
      setMovies(searchResult);
    } catch {
      setError("Error searching movies");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {error && <div>{error}</div>}
      {loading ? <div>Loading...</div> : <div>{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>}
    </div>
  );
}

export default Home;
```

## License
MIT License
