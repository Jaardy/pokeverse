import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Navigation } from './components/Navigation';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div data-testid="app">
      <Navigation />

      <Container></Container>
    </div>
  );
}

export { App };
