import "../css/MovieCard.css"
import axios from "axios"
import { useState, useEffect } from "react";

function MovieCard({ movie }) {

    const [favorite, setFavorite] = useState(false);
    const token = sessionStorage.getItem("token");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!token) {
            setFavorite(false);
            return;
        }

        let isMounted = true; // Track if the component is still mounted
        setLoading(true); // Start loading

        const fetchFavorites = async () => {
            try {
                if (!token) {
                    console.error("❌ No token found in localStorage");
                    return;
                }
        
                const response = await axios.get("http://localhost:5000/api/favorites", {
                    headers: { Authorization: `Bearer ${token}` }
                });
        
                console.log("✅ Favorites fetched:", response.data);
                setFavorite(response.data);
            } catch (error) {
                console.error("❌ Error fetching favorites:", error.response?.data || error);
            }
        };
        

        fetchFavorites();
    }, [token, movie.id]);

    const handleRemove = async (e) => {
        e.preventDefault();
    
        try {
            await axios.delete(`http://localhost:5000/api/favorites/${movie.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(`Removed movie with ID: ${movie.id}`);
            setFavorite(false);
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();


        try {
            await axios.post("http://localhost:5000/api/favorites",
                { movie_id: movie.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(`Added movie with ID: ${movie.id}`);
            setFavorite(true);
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    };


    function onFavoriteClick(e) {
        favorite ? handleRemove(e) : handleAdd(e);
    }

    return <div className="movie-card">
        <div className="movie-img">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
                {token && (
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        {favorite ? "❤️" : "♡"}
                    </button>
                )}
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard
