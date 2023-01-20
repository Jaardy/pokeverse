import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { Home } from './routes/Home';
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const shouldCallAPI = useRef(true);
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
    <React.StrictMode>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home pokemonList={pokemonList} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export { App };
