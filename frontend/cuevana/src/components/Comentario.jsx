import { useEffect, useState } from "react"
import "../styles/Comentario.css"
import toast, { Toaster } from "react-hot-toast";
import CartaComentario from "./CartaComentario"
import axios from 'axios'
export default function Comentario(idPelicula) {
    const [puntuacion, setPuntuacion] = useState(0)
    const [zero, setZero] = useState(false)
    const [comentario, setComentario] = useState("")
    const [listado, setListado] = useState("")
    const [mostrar, setMostrado] = useState(true)

    useEffect(() => {
        getComentarios()
    }, [])
    const getComentarios = async () => {
        const res = await axios.post("http://localhost:5000/comments", {
            id: idPelicula
        }).catch(function (error) {
            toast.error("Error al conectar con la api")
        })
        if (res.data.res !== false) {
            setListado(res.data.comments)
        } else {
            toast.error("Error al obtener los comentarios", {
                position: "top-right",
                duration: 6000,
                style: {
                    background: "bs-danger",
                    color: "#FFFF",
                },
            });
        }
    }

    const calificar = async () => {
        if (puntuacion > 0 || (puntuacion === 0 && zero)) {
            const res = await axios.post("http://localhost:5000/rate-movie", {
                id: idPelicula,
                calificacion: puntuacion
            }).catch(function (error) {
                toast.error("Error al conectar con la api")
            })
            if (res.data.res !== false) {
                console.log("se agrego calificaicon")
            } else {
                toast.error("Error al obtener al agregar calificacion", {
                    position: "top-right",
                    duration: 6000,
                    style: {
                        background: "bs-danger",
                        color: "#FFFF",
                    },
                });
            }
            toast.success("Se califico con 0")
        } else {
            toast("¿Quiere calificar con 0?\nSi es asi vuelva a dar click en calificar")
            setZero(true)
        }
        console.log(puntuacion)
    }

    const addcomentario = async () => {
        if (comentario !== "") {
            const res = await axios.post("http://localhost:5000/add-comment", {
                id_user: idPelicula,
                id_movie: JSON.parse(localStorage.getItem("user")).id,
                comment: comentario
            }).catch(function (error) {
                toast.error("Error al conectar con la api")
            })
            if (res.data.res !== false) {
                toast.success("Se agrego el comentario")
            } else {
                toast.error("Error al agregar comentario", {
                    position: "top-right",
                    duration: 6000,
                    style: {
                        background: "bs-danger",
                        color: "#FFFF",
                    },
                });
            }
        } else {
            toast("No se puede agregar un comentario vacio")
        }
        console.log(comentario)
    }

    return (<>
        <Toaster position="top-right" />
        <div className="d-flex flex-column">
            <h3 className="text-center">Calificar pelicula</h3>
            <div className="d-flex justify-content-center">
                <p className="clasificacion">
                    <input onChange={(e) => setPuntuacion(e.target.value)} id="radio1" className="esinput" type="radio" name="estrellas" value="5" />
                    <label className="star" htmlFor="radio1">★</label>
                    <input onChange={(e) => setPuntuacion(e.target.value)} id="radio2" type="radio" className="esinput" name="estrellas" value="4" />
                    <label className="star" htmlFor="radio2">★</label>
                    <input onChange={(e) => setPuntuacion(e.target.value)} id="radio3" type="radio" className="esinput" name="estrellas" value="3" />
                    <label className="star" htmlFor="radio3">★</label>
                    <input onChange={(e) => setPuntuacion(e.target.value)} id="radio4" type="radio" className="esinput" name="estrellas" value="2" />
                    <label className="star" htmlFor="radio4">★</label>
                    <input onChange={(e) => setPuntuacion(e.target.value)} id="radio5" type="radio" className="esinput" name="estrellas" value="1" />
                    <label className="star" htmlFor="radio5">★</label>
                </p>
            </div>
            {mostrar &&
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={calificar}>Calificar</button>
                </div>
            }
        </div>

        <div className="comments-container">
            <h1>Comentarios</h1>
            <div className="d-flex justify-content-center pad">
                <div className="form-floating">
                    <textarea onChange={(e) => setComentario(e.target.value)} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label htmlFor="floatingTextarea">Comments</label>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-success" onClick={addcomentario}>Agregar Comentario</button>
            </div>
            <ul id="comments-list" className="comments-list">
                {
                    listado.map((comentario) => {
                        <CartaComentario nombre={comentario.user} texto={comentario.comment} />
                    })
                }

            </ul>
        </div>
    </>)
}