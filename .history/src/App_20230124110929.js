import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './routes';
import { Navigation } from './components/Navigation';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home pokemonList={pokemonList} />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { App };
