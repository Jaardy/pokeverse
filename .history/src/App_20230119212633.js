import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { Home } from './routes/Home';
function App() {
  const [pokemonList, setPokemonList] = useState();

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={pokemonList && <Home pokemonList={pokemonList} />} />
        </Routes>
        <Navigation />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export { App };
