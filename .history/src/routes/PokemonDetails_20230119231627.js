import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';

export function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const { results } = await response.json();
    setPokemon(results);
  }, [name]);
  if (!pokemon) {
    return <>loading...</>;
  }
  return (
    <section>
      <img width="300" height="300" src={`https://img/pokemondb.net/artwork/large/${name}.jpg`} />
    </section>
  );
}
