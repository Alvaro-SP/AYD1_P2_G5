import React from "react";
import Table from "react-bootstrap/Table";
import '../styles/Tabla.css';

function Tabla(props) {

    function renderTableRows(data) {
        return data.map((item, index) => (
            <tr key={index}>
                {Object.keys(item).map((key) => (
                    <td key={key}>{item[key]}</td>
                ))}
            </tr>
        ));
    }


    return (
        <>
            <h4>{props.data.length > 0 ? `Vista previa CSV: ${props.tipo}` : ''}</h4>
            <div className="tablediv">

                <Table triped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {props.data.length > 0 && Object.keys(props.data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                        {renderTableRows(props.data)}
                    </thead>
                </Table>
            </div>
        </>
    )
}

export default Tabla;