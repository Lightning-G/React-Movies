import MovieCard from "../components/MovieCard"

function HomePage() {
    const movies = [
        {id:1, title: "Test1", release_date:"2022"},
        {id:2, title: "Test2", release_date:"2020"},
        {id:3, title: "Test3", release_date:"2024"},
    ];

    const handleSearch = () => {

    }


    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Serch for a Movie" className="search-input" />
        </form>

        <div className="grid-movies">
            {movies.map(movie => <MovieCard movie={movie} key7={movie.id} />)}
        </div>
    </div>
}

export default HomePage