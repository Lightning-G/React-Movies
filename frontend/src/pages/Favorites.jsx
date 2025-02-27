import "../css/Favorites.css"
import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import axios from "axios"


function Favorites() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (!token) {
                    console.error("❌ No token found");
                    return;
                }

                // Step 1: Fetch user's favorite movie IDs from your backend
                const response = await axios.get("http://localhost:5000/api/favorites", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("✅ Favorites fetched:", response.data);

                const favoriteMovieIds = response.data.map(fav => fav.movie_id);

                // Step 2: Fetch movie details from TMDb for each favorite
                const movieRequests = favoriteMovieIds.map(id =>
                    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                        params: { api_key: "de19a92b998020e83bd7e5c627862340" }
                    })
                );

                const movieResponses = await Promise.all(movieRequests);
                const favoriteMovies = movieResponses.map(res => res.data);

                setMovies(favoriteMovies);
            } catch (err) {
                console.error("❌ Error fetching favorites:", err);
                setError("Failed to load favorite movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="home">
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="grid-movies">
                    {movies.length > 0 ? (
                        movies.map(movie => <MovieCard movie={movie} key={movie.id} />)
                    ) : (
                        <p>No favorites yet. Start adding some!</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Favorites