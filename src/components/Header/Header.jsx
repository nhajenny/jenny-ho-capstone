import { NavLink } from "react-router-dom";
import "./Header.scss"; 

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <div className="nav__button-container">
                    {/* Home Link */}
                    <NavLink
                        to="/"
                        className={({ isActive }) => 
                            isActive ? "nav__link nav__link--active" : "nav__link"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/festivals"
                        className={({ isActive }) => 
                            isActive ? "nav__link nav__link--active" : "nav__link"
                        }
                    >
                        All Festivals
                    </NavLink>
                    <NavLink
                        to="/tips"
                        className={({ isActive }) => 
                            isActive ? "nav__link nav__link--active" : "nav__link"
                        }
                    >
                        Tips and Tricks
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Header;
