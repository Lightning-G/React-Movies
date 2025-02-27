import { Link } from "react-router-dom";
import "../css/NavBar.css"
import { useState } from "react";

function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return <nav className="navBar">
        <div className="navBar-brand">
            <Link to="/">
                <img src={("/Logo.png")} alt="Logo" />
            </Link>
        </div>
        <div className="navBar-links">
            <Link to="/" className="nav-link">🏠︎</Link>
            <Link to="/favorites" className="nav-link">❤️</Link>
            <div className="dropdown-menu">
                <button
                    className="profile-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    ☰
                </button>
                {dropdownOpen && (
                    <div>
                        <Link to="/profile" className="dropdown-item">
                            <img src={("../public/user.png")} alt="Logo" />
                        </Link>
                        <Link to="/register" className="dropdown-item">
                            <img src={("../public/vite.svg")} alt="Logo" />
                        </Link>
                        <Link to="/login" className="dropdown-item">
                            <img src={("../public/login.png")} alt="Logo" />
                        </Link>
                    </div>
                )}
            </div>
        </div>




    </nav>
}

export default NavBar