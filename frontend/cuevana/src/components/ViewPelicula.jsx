import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "../styles/ViewPelicula.css";
import Comentario from "./Comentario";

export function ViewPelicula() {
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
  const [valorWatchlist, setValorWatchlist] = useState("");

  const changeWatchlist = async () => {
    const result = await axios.post("http://localhost:5000/addwatchlist", {
      iduser: JSON.parse(localStorage.getItem("user")).id,
      idmovie: localStorage.getItem("idPelicula")
    });

    if (result.data.res) {
      setValorWatchlist("bi bi-heart-fill");
    } else {
      setValorWatchlist("bi bi-heart");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await axios.post("http://localhost:5000/verinfopelicula", {
        idmovie: localStorage.getItem("idPelicula"),
        iduser: JSON.parse(localStorage.getItem("user")).id,
      });

      if (result.data.res) {
        setDirector(result.data.res.director);
        setYear(result.data.res.anio);
        setDescription(result.data.res.resumen);
        setTitleMovie(result.data.res.nombre);

        if (result.data.res.watchlist) {
          setValorWatchlist("bi bi-heart-fill");
        } else {
          setValorWatchlist("bi bi-heart");
        }

        const newListaActores = []
        result.data.res.actores.map((actor) => {
          newListaActores.push({
            nombre: actor.nombre,
            idActor: actor.idactor
          })
        })
        
        setActores(newListaActores);
        setPoster(result.data.res.poster);

        result.data.res.moviesimages.map((resource) => {
          if (urlTrailer === "" && resource.link_image.includes("watch")){
            setUrlTrailer(resource.link_image)
          }
        })

      }
      
      if (result.data.res.rating) {
        let valueStars = parseInt(result.data.res.rating) / 1;
        let newStarsValues = [];
        for (let i = 0; i < valueStars; i++) {
          newStarsValues.push("bi bi-star-fill");
        }

        if (result.data.res.rating % 1 !== 0) {
          newStarsValues.push("bi bi-star-half");
        }

        for (let i = valueStars; i < 5; i++) {
          newStarsValues.push("bi bi-star");
        }

        setStarFill(newStarsValues);
      }
    }

    getData()
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
                style={{height: "100%", width: "100%"}}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title">{titleMovie}</h1>
                <p className="card-text">{description}</p>
                <div className="card-text">
                  <small>
                    Director: {director}
                    <>&nbsp;&nbsp;&nbsp;</>
                    Año: {year}
                  </small>
                </div>
                <div className="card-text" id="textReparto">
                  <h5 className="text-white" id="RepartoTitle">
                    Reparto
                  </h5>
                  <small className="text-white">
                      {actores.map((actor, index) => {
                        return (
                          <span key={index}>
                            <a href={"http://localhost:3000/veractor/" + actor.idActor} className="text-white">
                              {actor.nombre}
                            </a>
                            <>
                              &nbsp;
                              &nbsp;
                              &nbsp;
                              &nbsp;
                            </>
                          </span>
                        ) 
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
      <Comentario/>
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
