import React from "react";
import Carousel from 'react-bootstrap/Carousel';



function Card() {

    return (
        <Carousel>

            <Carousel.Item interval={2000}>
                <div
                    className="d-block w-100"
                    style={{
                        backgroundColor: "#2E4053 ",
                        height: "500px",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}
                >
                    <Carousel.Caption>
                        <h3>Selenccione CSV</h3>
                        <p>Proceda a cargar los documentos en formato csv</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
                <div
                    className="d-block w-100"
                    style={{
                        backgroundColor: "#273746  ",
                        height: "500px",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}
                >
                    <Carousel.Caption>
                        <h3>Escoger CSV a cargar</h3>
                        <p>Pulse el boton azul y cargue los diferentes CSV</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}
export default Card;