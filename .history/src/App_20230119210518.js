import React, { useEffect, useState } from 'react';
import { browserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Navigation } from './components/Navigation';
import { Home } from './routes/Home';
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
      <Home />
      <Container></Container>
    </div>
  );
}

export { App };
