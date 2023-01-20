import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  return <div>{JSON.stringify(name)}</div>;
}
