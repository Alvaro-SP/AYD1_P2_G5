import React from 'react';
import { useEffect, useState } from 'react';
import { Image, ListGroup, Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";
import '../styles/VerActor.css';



function VerActor() {
  const { id } = useParams()
  const [actorData, setActorData] = useState({ actor: {}, movies: [] });

  useEffect(() => {
    const getPeliculas = async () => {
      const res = await axios.post("http://localhost:5000/info-actor", {
        id: id
      });
      if (res.data.res !== false) {
        console.log(res.data.res)
        setActorData(res.data.res);
      } else {
        console.log("no se obtuvo respuesta del servidor");
      }
    };
    getPeliculas();
  }, [id]);

  return (
    <Container fluid className="actor-info-container">
      <div className="actor-info-background"></div>
      <Image className="actor-info-image" src={actorData.actor.image} />
      <h2 className="actor-info-name">{actorData.actor.name}</h2>
      <h5 className='actor-nacimiento'>Fecha de nacimiento {actorData.actor.date_nac}</h5>
      <Row>
        <Col sm={8}>
          <p className="actor-info-text">{actorData.actor.summary}</p>
        </Col>
      </Row>
      <Router>
        <ListGroup className="actor-info-top-movies" variant="flush">
          {actorData.movies.map((movie, index) => (
            <ListGroup.Item key={index}>
              <Link to={`/peliculas/${movie.id}`}><span>{movie.name}</span></Link>
              <Badge pill variant="secondary">{movie.year}</Badge>
            </ListGroup.Item>
          ))}
          <Outlet />
        </ListGroup>
        <Routes>
          <Route path="/peliculas/:id" /*element={ <Pelicula /> }*/ />
        </Routes>
      </Router>
    </Container>
  );
}

export default VerActor;


/**
 const actor = {
    name: 'Leonardo DiCaprio',
    image: 'https://i.blogs.es/ad5080/leonardo-dicaprio/1366_2000.jpeg',
    info: 'Leonardo Wilhelm DiCaprio is an American actor, film producer, and environmental activist. He has often played unconventional roles, particularly in biopics and period films. As of 2021, his films have grossed US$7.2 billion worldwide, and he has placed eight times in annual rankings of the world\'s highest-paid actors. He has won various awards, including an Academy Award, a BAFTA Award, and three Golden Globe Awards.',
    fechaNacimiento: '5/6/1993',
    topMovies: [
      { title: 'The Revenant', year: 2015 },
      { title: 'The Wolf of Wall Street', year: 2013 },
      { title: 'Inception', year: 2010 },
      { title: 'The Departed', year: 2006 },
      { title: 'Catch Me If You Can', year: 2002 },
    ],
  };
 */