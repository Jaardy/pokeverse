import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function PokemonDetails() {
  const params = useParams();
  const [pokemon, setPokemon] = useState(null);
  return <div>{JSON.stringify(params.name)}</div>;
}
