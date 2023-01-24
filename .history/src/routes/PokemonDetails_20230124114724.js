import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';

export function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const { name } = useParams();
  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
    };
    callAPI();
  }, [name]);

  if (!pokemon) {
    return <>loading...</>;
  }

  return (
    <div>
      <img width="300" height="300" src={`https:///img.pokemondb.net/artwork/large/${name}.jpg`} />
      <h1>{name}</h1>
      <div></div>
    </div>
  );
}
