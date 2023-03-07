import React from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Tabla from './Tabla';
import ModalConfirmacion from "./ModalConfirmacion";
import csv from 'csvtojson';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import '../styles/AddMovie.css';
import Card from "./Card";

function AddMovie() {
    const [actores, setActores] = useState([]); //array para almacenar csv de actores
    const [peliculas, setPeliculas] = useState([]); //array para almacenar csv de peliculas
    const [reparto, setReparto] = useState([]); //array para almacenar csv de reparto
    const [recursos, setRecursos] = useState([]); //array para almacenar csv de recursos
    const [ruta, setRuta] = useState(''); //variable para almacenar ruta del archivo

    //almacenar nombres de csv
    const [csvactor, setCsvactor] = useState('');
    const [csvpelicula, setCsvpelicula] = useState('');
    const [csvreparto, setCsvreparto] = useState('');
    const [csvrecurso, setCsvrecurso] = useState('');

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [resolve, setResolve] = useState(() => () => { });

    const cargarCSV = (tipo) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async (event) => {
                const csvData = event.target.result;
                const jsonArray = await csv().fromString(csvData);

                switch (tipo) {
                    case 'actores':
                        actualizarEstado(jsonArray, actores, tipo, setActores,file, setCsvactor);
                        break;
                    case 'peliculas':
                        actualizarEstado(jsonArray, peliculas, tipo, setPeliculas,file, setCsvpelicula);
                        break;
                    case 'reparto':
                        actualizarEstado(jsonArray, reparto, tipo, setReparto,file, setCsvreparto);
                        break;
                    case 'recursos':
                        actualizarEstado(jsonArray, recursos, tipo, setRecursos,file, setCsvrecurso);
                        break;
                    default:
                        break;
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    //funcion que valida estado de arrays
    async function actualizarEstado(jsonArray, estado, tipo, setEstado,nombrecsv,setCsv) {
        if (estado.length > 0) {
            const confirmars = await confirmar(`Ya existe un csv: ${tipo}, ¿Desea sobreescribirlo?`);
            if (confirmars) {
                setEstado(jsonArray);
                setCsv(nombrecsv.name);
                setRuta(nombrecsv.name);
            }
        } else {
            setEstado(jsonArray);
            setCsv(nombrecsv.name);
            setRuta(nombrecsv.name);
        }

    }

    function confirmar(mensaje) {
        return new Promise((resolve) => {
            setMensaje(mensaje);
            setShowConfirmation(true);
            setResolve(() => () => resolve(true));
        });
    }

    function handleConfirm() {
        resolve();
        setShowConfirmation(false);
    }

    function handleCancel() {
        setResolve(() => () => { });
        setShowConfirmation(false);
    }

    function enviar(){
        //crear json con nombres de csv
        const json = {
            pathactor: '../entradas/'+csvactor,
            pathpelicula: '../entradas/'+csvpelicula,
            pathreparto: '../entradas/'+csvreparto,
            pathrecurso: '../entradas/'+csvrecurso
        }
        console.log(json);
        //enviar json a backend a traves de metodo post
        fetch('http://localhost:5000/cargamasiva',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }
        )

    }


    return (
        <Container fluid='md'>
            <Row>
                <Col >
                    <h1>Agregar Peliculas</h1>
                </Col>
            </Row>
            <Row>
                <ModalConfirmacion
                    show={showConfirmation}
                    message={mensaje}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-5">
                        <Form.Label>Nombre archivo</Form.Label>

                        <div className="d-flex">
                            <Form.Control placeholder="Ruta" disabled defaultValue={ruta} />
                            {
                                actores.length > 0 && peliculas.length > 0 && reparto.length > 0 && recursos.length > 0 ?
                                    <Button variant="success" size="lg" onClick={enviar}>
                                        Agregar a DB
                                    </Button>
                                    :
                                    <DropdownButton title="Escoger CSV a cargar" id="bg-nested-dropdown">
                                        <Dropdown.Item eventKey="actores" onClick={(e) => cargarCSV('actores')}>Cargar Actores</Dropdown.Item>
                                        <Dropdown.Item eventKey="peliculas" onClick={(e) => cargarCSV('peliculas')}>Cargar Peliculas</Dropdown.Item>
                                        <Dropdown.Item eventKey="reparto" onClick={(e) => cargarCSV('reparto')}>Cargar Reparto</Dropdown.Item>
                                        <Dropdown.Item eventKey="recursos" onClick={(e) => cargarCSV('recursos')}>Cargar Recursos</Dropdown.Item>
                                    </DropdownButton>
                            }
                        </div>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {actores.length > 0 || peliculas.length > 0 || reparto.length > 0 || recursos.length > 0 ? null : <Card />}
            </Row>
            <Row>
                {actores.length > 0 ? <Tabla data={actores} tipo={'Actores'} /> : null}
            </Row>
            <Row>
                {peliculas.length > 0 ? <Tabla data={peliculas} tipo={'Peliculas'} /> : null}
            </Row>
            <Row>
                {reparto.length > 0 ? <Tabla data={reparto} tipo={'Reparto'} /> : null}
            </Row>
            <Row>
                {recursos.length > 0 ? <Tabla data={recursos} tipo={'Recursos'} /> : null}
            </Row>

        </Container>
    );
}
export default AddMovie;