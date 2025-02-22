import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import "../css/HomePage.css"
import { getPopularMovies } from "../services/api";
import { searchMovies } from "../services/api";

function HomePage() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => 
        {const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch(err) {
                console.log(err)
                setError("failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()

        }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        alert(searchQuery)
    }


    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Search for a Movie" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="search-btn"> Search</button>
        </form>

        <div className="grid-movies">
            {movies.map((movie) => <MovieCard movie={movie} key={movie.id} />
            )}
        </div>
    </div>
}

export default HomePage 