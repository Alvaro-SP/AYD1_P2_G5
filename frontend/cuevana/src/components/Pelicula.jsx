import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function Pelicula(props) {
  const agregar = async (id) => {
    const res = await axios.post("http://localhost:5000/addwatchlist", {
      iduser: JSON.parse(localStorage.getItem("user")).id,
      idmovie: id,
    });
    if (res.data.res !== false) {
      console.log("se agrego");
    } else {
      console.log("fallo en el servidor");
    }
  };
  return (
    <div className="card card-size" key={props.index}>
      <img
        src={props.imagen}
        className="card-img-top"
        alt="..."
        width="140px"
        height="200px"
      />
      <div className="card-img-overlay bg-dark cuerpo">
        <h5 className="card-text">{props.titulo}</h5>
        <div className="d-flex justify-content-center">
          <a
            onClick={() => agregar(props.index)}
            className="btn btn-light"
            href="#!"
          >
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
          </a>
          <a className="btn btn-info" href={"http://localhost:3000/watchMovie"} onClick={() => localStorage.setItem("idPelicula", props.index)} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
