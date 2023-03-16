import "../styles/navbar.css";
import ListaPelicula from "./ListaPelicula";
import { useEffect } from 'react'
import { AddMovie } from "./AddMovie";
import Watchlist from "./Watchlist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ViewPelicula } from "./ViewPelicula";
export default function NavbarCueva() {
  useEffect(() => {
    if(localStorage.getItem("admin")){
      // window.location.href("http://localhost:3000/addmovie")
    }
  }, []);
  return (
    <>
      <Router>
        <div className="container-fluid ">
          <div className="row ">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar collapse"
            >
              <div className="position-sticky pt-3 sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a href="./" className="nav-link text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-film"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                      </svg>
                      &nbsp;Peliculas
                    </a>
                  </li>
                  <li>
                    <a href="./watchlist" className="nav-link text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bookmark-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                      </svg>
                      &nbsp;Watchlist
                    </a>
                  </li>
                  <li>
                    {
                      (localStorage.getItem("admin") === "true") &&
                        <a href="./addmovie" className="nav-link text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-file-earmark-plus"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                          <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                        </svg>
                        &nbsp;Agregar peliculas
                      </a>
                      
                    }
                    
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<ListaPelicula />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/watchMovie/:idPelicula" element={<ViewPelicula />} />
        </Routes>
      </Router>
    </>
  );
}
