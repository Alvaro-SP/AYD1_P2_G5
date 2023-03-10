import React from "react";
import "../styles/Watchlist.css";

export function Watchlist() {
  return (
    <div
      className="container-fluid px-5"
      style={{
        background: "url(https://elmaramusic.com/wp-content/uploads/2016/04/shutterstock_142504771-copia-1024x537.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div className="row gx-0">
        <div className="col">
          <div className="card p-3" style={{ width: "18rem", backgroundColor: "transparent", backdropFilter: "blur(15px)" }}>
            <img
              src="https://i.pinimg.com/736x/f1/13/a0/f113a0ac7938bb5ff14bce7cc07ece60.jpg"
              alt=""
              className="card-img-top"
              width={"200px"}
              height={"300px"}
            />
            <div className="card-body">
              <h5 className="card-title text-white">Titulo Pelicula</h5>
              <p className="text-white">A Little Description Of The Movie</p>
              <div className="row gy-2" id="rowButton">
                <a href="#!" className="btn btn-primary">
                  <i className="bi bi-arrows-angle-expand"></i>
                  Ver Mas
                </a>
                <a href="#!" className="btn btn-success">
                  <i className="bi bi-stopwatch-fill"></i>
                  Watchlist
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card p-3" style={{ width: "18rem" }}>
            <img
              src="https://i.pinimg.com/736x/f1/13/a0/f113a0ac7938bb5ff14bce7cc07ece60.jpg"
              alt=""
              className="card-img-top"
              width={"200px"}
              height={"300px"}
            />
            <div className="card-body">
              <h5 className="card-title">Titulo Pelicula</h5>
              <p>A Little Description Of The Movie</p>
              <div className="row gy-2" id="rowButton">
                <a href="#!" className="btn btn-primary">
                  <i className="bi bi-arrows-angle-expand"></i>
                  Ver Mas
                </a>
                <a href="#!" className="btn btn-success">
                  <i className="bi bi-stopwatch-fill"></i>
                  Watchlist
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card p-3" style={{ width: "18rem" }}>
            <img
              src="https://i.pinimg.com/736x/f1/13/a0/f113a0ac7938bb5ff14bce7cc07ece60.jpg"
              alt=""
              className="card-img-top"
              width={"200px"}
              height={"300px"}
            />
            <div className="card-body">
              <h5 className="card-title">Titulo Pelicula</h5>
              <p>A Little Description Of The Movie</p>
              <div className="row gy-2" id="rowButton">
                <a href="#!" className="btn btn-primary">
                  <i className="bi bi-arrows-angle-expand"></i>
                  Ver Mas
                </a>
                <a href="#!" className="btn btn-success">
                  <i className="bi bi-stopwatch-fill"></i>
                  Watchlist
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100"></div>
        <div className="col">
          <div className="card p-3" style={{ width: "18rem" }}>
            <img
              src="https://i.pinimg.com/736x/f1/13/a0/f113a0ac7938bb5ff14bce7cc07ece60.jpg"
              alt=""
              className="card-img-top"
              width={"200px"}
              height={"300px"}
            />
            <div className="card-body">
              <h5 className="card-title">Titulo Pelicula</h5>
              <p>A Little Description Of The Movie</p>
              <div className="row gy-2" id="rowButton">
                <a href="#!" className="btn btn-primary">
                  <i className="bi bi-arrows-angle-expand"></i>
                  Ver Mas
                </a>
                <a href="#!" className="btn btn-success">
                  <i className="bi bi-stopwatch-fill"></i>
                  Watchlist
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card p-3" style={{ width: "18rem" }}>
            <img
              src="https://i.pinimg.com/736x/f1/13/a0/f113a0ac7938bb5ff14bce7cc07ece60.jpg"
              alt=""
              className="card-img-top"
              width={"200px"}
              height={"300px"}
            />
            <div className="card-body">
              <h5 className="card-title">Titulo Pelicula</h5>
              <p>A Little Description Of The Movie</p>
              <div className="row gy-2" id="rowButton">
                <a href="#!" className="btn btn-primary">
                  <i className="bi bi-arrows-angle-expand"></i>
                  Ver Mas
                </a>
                <a href="#!" className="btn btn-success">
                  <i className="bi bi-stopwatch-fill"></i>
                  Watchlist
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card p-3" style={{ width: "18rem" }}>
            <img
              src="https://i.pinimg.com/736x/f1/13/a0/f113a0ac7938bb5ff14bce7cc07ece60.jpg"
              alt=""
              className="card-img-top"
              width={"200px"}
              height={"300px"}
            />
            <div className="card-body">
              <h5 className="card-title">Titulo Pelicula</h5>
              <p>A Little Description Of The Movie</p>
              <div className="row gy-2" id="rowButton">
                <a href="#!" className="btn btn-primary">
                  <i className="bi bi-arrows-angle-expand"></i>
                  Ver Mas
                </a>
                <a href="#!" className="btn btn-success">
                  <i className="bi bi-stopwatch-fill"></i>
                  Watchlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
