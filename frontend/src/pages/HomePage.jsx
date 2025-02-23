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

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()

    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if(loading) return
        setLoading(true)

        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        }
        finally {
            setLoading(false)
        }


    }


    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Search for a Movie" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="search-btn"> Search</button>
        </form>


        {error && <div className="error-message">{error}</div>}

        {loading ? <div className="loading">Loading...</div> : <div className="grid-movies">
            {movies.map((movie) => <MovieCard movie={movie} key={movie.id} />
            )}
        </div>}
    </div>
}

export default HomePage 