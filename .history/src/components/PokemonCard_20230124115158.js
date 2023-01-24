import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styles from './PokemonCard.module.css';

function PokemonCard({ url, name }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return (
    <Card style={{ width: '18rem' }} className="mx-auto">
      <Card.Img width="286" height="286" bg="dark" variant="top" src={pokemon?.sprites.front_default} />
      <Card.Body>
        <Link to={name}>
          <Card.Title>{name.toUpperCase()}</Card.Title>
        </Link>
        <Card.Text as="div">
          <h1 className={styles.cardHeader}>Abilities:</h1>
          <ul>
            {pokemon?.abilities.map((ability) => (
              <li key={ability.ability.name}>
                <span key={ability.ability.name}>{ability.ability.name}</span>
              </li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export { PokemonCard };
