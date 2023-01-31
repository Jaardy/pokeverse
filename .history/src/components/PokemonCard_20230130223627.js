import React, { useEffect, useState, useContext } from 'react';
import { FavouritesContext } from '../App';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import styles from './PokemonCard.module.css';

function PokemonCard({ url, name }) {
  const [pokemon, setPokemon] = useState(null);
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);
  console.log(favourites);

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
        <Card.Title>
          <Link to={`${name}`}>{name.toUpperCase()}</Link>
        </Card.Title>
        <Card.Text as="div">
          <h1 className={styles.cardHeader}>Abilities:</h1>
          <ul>
            {pokemon?.abilities.map(({ ability }) => (
              <li key={ability.name}>
                <span key={ability.name}>{ability.name}</span>
              </li>
            ))}
          </ul>
        </Card.Text>
        {favourites.includes(name) ? (
          <Button variant="danger" onClick={() => removeFavourite(name)}>
            Remove from Favourites
          </Button>
        ) : (
          <Button variant="primary" onClick={() => addFavourite(name)}>
            Add to Favourites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export { PokemonCard };
