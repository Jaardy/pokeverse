import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';

export function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
 const should
  useEffect(() => {
    const callAPI = async () => {
      console.log(name);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const { results } = await response.json();
      setPokemon(results);
    };
    callAPI();
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
