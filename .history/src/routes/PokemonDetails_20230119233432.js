import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';

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
    <section>
      <img width="300" height="300" src={`https://img.pokemondb.net/artwork/large/${name}.jpg`} />
      <h1>{name}</h1>
      <p>height: {pokemon.height}</p>
      <p>weight: {pokemon.weight}</p>
      <div>
        <p>Abilities:</p>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={`${name}-${ability.name}`}>
              <span>{ability.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
