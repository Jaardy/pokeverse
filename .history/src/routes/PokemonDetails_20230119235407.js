import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const shouldCallAPI = useRef(true);
  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
      console.log(data);
    };

    if (shouldCallAPI.current) {
      console.count('Effect Run base');
      callAPI();
      shouldCallAPI.current = false;
    }
  }, [name]);
  if (!pokemon) {
    return <>loading...</>;
  }
  return (
    <Container>
      <img width="300" height="300" src={`https://img.pokemondb.net/artwork/large/${name}.jpg`} />
      <h1>{name.toUpperCase()}</h1>
      <Row>
        <Col xs={4}>
          <p>
            <strong>Height</strong>: {pokemon.height}
          </p>
        </Col>

        <Col xs={4}>
          <p>Weight: {pokemon.weight}</p>
        </Col>
      </Row>
      <Row xs={4}>
        <p>Abilities:</p>
        <ul>
          {pokemon.abilities.map(({ ability }) => (
            <Col>
              <li key={ability.name}>
                <span>{ability.name}</span>
              </li>
            </Col>
          ))}
        </ul>
      </Row>
      <Row>
        <Col xs={4}>
          <p>Stats:</p>
        </Col>
        <Col xs={8}>
          <ul>
            {pokemon.stats.map(({ stat }) => (
              <li key={stat.name}>
                <span>{stat.name}</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row></Row>

      <div></div>
      <div></div>
    </Container>
  );
}
