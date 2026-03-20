import { Link } from "react-router-dom";
import "../../css/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie_Verse</Link>
        <Link to="/favourites" className="nav-link">
          Favourites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
