import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "../styles/ViewPeliculas.css";

export function ViewPelicula() {
  const {
    match: { params },
  } = this.props;

  const [verVideo, setVideoPlay] = useState(false);
  const [fillStars, setStarFill] = useState([
    "bi bi-star",
    "bi bi-star",
    "bi bi-star",
    "bi bi-star",
    "bi bi-star",
  ]);
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [actores, setActores] = useState([]);
  const [poster, setPoster] = useState("");
  const [titleMovie, setTitleMovie] = useState("");
  const [urlTrailer, setUrlTrailer] = useState("");
  const [valorFill, setValorFill] = useState(0);
  const [valorWatchlist, setValorWatchlist] = useState("");

  const changeWatchlist = async () => {
    const result = await axios.post("http://localhost:5000/addwatchlist", {
      iduser: JSON.parse(localstorage.getItem("user")),
      idmovie: params.idPelicula,
    });

    if (result.data.flag) {
      setValorWatchlist("bi bi-heart-fill");
    } else {
      setValorWatchlist("bi bi-heart");
    }
  };

  $("#exampleModal").on("hide.bs.modal", () => {
    setVideoPlay(false);
  });

  useEffect(async () => {
    console.log(params.idPelicula);
    const result = await axios.post("http://localhost:5000/watchmovie", {
      idmovie: params.idPelicula,
    });

    if (result.data.res) {
      setDirector(result.data.director);
      setYear(result.data.year);
      setDescription(result.data.description);
      setActores(result.data.listadoActores);
      setPoster(result.data.resources[0]);
      setUrlTrailer(result.data.resources[1]);
      setTitleMovie(result.data.title);
    }

    const ranking = await axios.post("http://localhost:5000/promediototal", {
      idmovie: params.idPelicula,
    });

    if (ranking.data.res) {
      setValorFill(ranking.data.res / 1);
      setValorHalf(ranking.data.res % 1);
      const newStarsValues = [];

      for (let i = 0; i < valorFill; i++) {
        newStarsValues.push("bi bi-star-fill");
      }

      if (ranking.data.res % 1 != 0) {
        newStarsValues.push("bi bi-star-half");
      }

      for (let i = valorFill; i < 5; i++) {
        newStarsValues.push("bi bi-star");
      }

      setStarFill(newStarsValues);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={poster}
                className="img-fluid rounded-start"
                alt={titleMovie}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title">{titleMovie}</h1>
                <p className="card-text">{description}</p>
                <div className="card-text">
                  <small>
                    Director: {director}
                    Año: {year}
                  </small>
                </div>
                <div className="card-text" id="textReparto">
                  <h5 className="text-white" id="RepartoTitle">
                    Reparto
                  </h5>
                  <small className="text-white">
                    {actores.map((actor, index) => {
                      (
                        <a href="#!" className="text-white" key={index}>
                          {actor}
                        </a>
                      ) & nbsp;
                      nbsp;
                      nbsp;
                      nbsp;
                    })}
                  </small>
                </div>
                <div className="card-text" id="ActiveArea">
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setVideoPlay(true)}
                  >
                    <i className="bi bi-youtube"></i>
                    &nbsp;&nbsp;Ver Trailer
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-lg text-white"
                    onClick={() => changeWatchlist()}
                  >
                    <i className={valorWatchlist}></i>
                    &nbsp;&nbsp;Watchlist
                  </button>
                  <div id="watchRanking">
                    <i className={fillStars[0]}></i>
                    <i className={fillStars[1]}></i>
                    <i className={fillStars[2]}></i>
                    <i className={fillStars[3]}></i>
                    <i className={fillStars[4]}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Trailer
              </h1>
              <button
                type="button"
                className="btn btn-outline-light"
                data-bs-dismiss="modal"
                onClick={() => setVideoPlay(false)}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
            <div className="modal-body">
              <ReactPlayer
                url={urlTrailer}
                playing={verVideo}
                className="react-player"
                width="100%"
                height="100%"
                volume={0.2}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
