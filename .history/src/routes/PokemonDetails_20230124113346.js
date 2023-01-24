import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function PokemonDetails() {
  const [pokemon, setPokemon] = setState(null);
  const { name } = useParams();

  return <div>{name}</div>;
}
