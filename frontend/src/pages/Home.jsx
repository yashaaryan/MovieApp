import MovieCard from "../components/MovieCard";
import { useState,useEffect } from "react";
import { searchMovies,getPopularMovie } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies,setMovies]= useState([]);
  const [error,setError] =useState(null);
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const loadPopularMovies= async() =>{
        try{
            const popularMovies= await getPopularMovie()
            setMovies(popularMovies)
            console.log(popularMovies);

        }catch(err){
            setError("err")
        }
        finally{
            setLoading(false)
        }
    }
    loadPopularMovies()
  },[])
  const handleSearch = async(e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if(loading)return
    setLoading(true)
    try {
        const searchResult= await searchMovies(searchQuery)
        setMovies(searchResult)
        setError(null)
    } catch (error) {
        setError("err")
    }finally{
        setLoading(false)
    }


    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="search for movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {loading? (
        <div className="loading">loading</div>
      ):(
      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery) && (
              <MovieCard movie={movie} key={movie.id} />
            )
        )}
      </div>)}
    </div>
  );
}

export default Home;
