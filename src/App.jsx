import "./css/App.css";
import Home from "./assets/pages/Home.jsx";
import Favourites from "./assets/pages/Favourites.jsx";
import { Routes, Route } from "react-router-dom";
import NavBar from "./assets/components/NavBar.jsx";
import { MovieProvider } from "./contexts/MovieContext.jsx";  

function App() {
  return (
    <MovieProvider>
      <div className="app-shell">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
