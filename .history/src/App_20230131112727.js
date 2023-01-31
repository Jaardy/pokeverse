import React, { useEffect, useState, useRef, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { Home } from './routes/Home';
import { PokemonDetails } from './routes/PokemonDetails';
import { Favourites } from './routes/Favourites';
import { FavouritesProvider } from './FavouritesProvider';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const shouldCallAPI = useRef(true);
  useEffect(() => {
    console.count('Effect Run');
    if (shouldCallAPI.current) {
      shouldCallAPI.current = false;
      fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
        .then((res) => res.json())
        .then((data) => {
          setPokemonList(data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  if (!pokemonList.length) {
    return <div>Loading...</div>;
  }
  return (
    <React.StrictMode>
      <FavouritesProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home pokemonList={pokemonList} />} />
            <Route path="/:name" element={<PokemonDetails />} />
            <Route
              path="/favourites"
              element={<Favourites pokemonList={pokemonList.filter((pokemon) => favourites.includes(pokemon.name))} />}
            />
          </Routes>
        </BrowserRouter>
      </FavouritesProvider>
    </React.StrictMode>
  );
}

export { App };
