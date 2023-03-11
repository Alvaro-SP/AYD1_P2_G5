import { useEffect, useState } from 'react'
import '../styles/ListaPelicula.css'
import axios from 'axios'
import toast from "react-hot-toast";
import Pelicula from './Pelicula';

export default function ListaPelicula() {
    const [listado, setListado] = useState([])
    const [loading, setLoading] = useState(true)
    const [busqueda, setBusqueda] = useState("")

    const peliculas = [
        {
            titulo: "El Padrino",
            imagen: "https://img2.rtve.es/i/?w=1600&i=1647265202826.jpg",
        },
        {
            titulo: "Pulp Fiction",
            imagen: "https://resize-media.festival-cannes.com/fit-in/1600x903/film_film/0002/13/6173d51ead0a8a2b7bad7d65bf340b02d35d2ed9.jpeg",
        },
        {
            titulo: "El Club de la Pelea",
            imagen: "https://indiehoy.com/wp-content/uploads/2022/01/fight-club-1.jpg",
        },
        {
            titulo: "El Señor de los Anillos: El Retorno del Rey",
            imagen: "http://leelibros.com/biblioteca/files/images/retorno_rey_princ.jpg",
        },
        {
            titulo: "Spiderman: Un Nuevo Universo",
            imagen: "https://www.informador.mx/__export/1659379855682/sites/elinformador/img/2022/08/01/20160426_crop1659375778693.jpg_1970638775.jpg",
        },
    ]

    useEffect(() => {
        getPeliculas()
        setListado(peliculas)
    }, [])

    const getPeliculas = async () => {
        const res = await axios.get("http://localhost:5000/vercatalogo")
        if (res.data.res !== false) {
            setListado(res.data.res)
            setLoading(true)
        } else {
            toast.success("Error en la base", {
                position: "top-right",
                duration: 6000,
                style: {
                  background: "bs-success",
                  color: "#FFFF",
                },
              });
        }
    }

    const filteredPeliculas = () => {
        return listado.filter((pelicula) => {
            return pelicula.titulo.toLowerCase().includes(busqueda.toLowerCase())
        })
    }

    if (!loading) {
        return (<>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#!">Cuevana</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Buscar" aria-label="Search" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                />
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="#!"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>&nbsp;Sign out</a>
                    </div>
                </div>
            </header>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-dark wi text-white">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Peliculas</h1>
                </div>
            </main>
        </>)
    } else {
        return (<>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#!">Cuevana</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                />
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="#!"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>&nbsp;Sign out</a>
                    </div>
                </div>
            </header>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 wi text-white">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Peliculas</h1>
                </div>
                <div className="d-flex flex-wrap">      
                       {filteredPeliculas().map((película) => (
                         <Pelicula imagen={película.imagen} titulo={película.titulo} />
                       ))}
                </div>
                <div className='row'>
                    <ul
                        className="pagination justify-content-center pagination-lg flex-wrap"
                        style={{ paddingTop: "2%" }}
                    >
                        <li className="page-item">
                            <a href="#!" className="page-link">
                                <span>
                                    <i className="bi bi-caret-left-square-fill"></i>
                                </span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#!">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#!">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#!">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#!">
                                4
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#!">
                                5
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#!">
                                6
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#!">
                                7
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#!">
                                8
                            </a>
                        </li>
                        <li className="page-item">
                            <a href="#!" className="page-link">
                                <span>
                                    <i className="bi bi-caret-right-square-fill"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </main>
        </>)
    }

}