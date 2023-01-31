import React, { useEffect, useState, useRef, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { Home } from './routes/Home';
import { PokemonDetails } from './routes/PokemonDetails';

export const FavouritesContext = createContext();

export default function App() {
  const [favourites, setFavourites] = useState([]);
  function addFavourite(favourite) {
    setFavourites([...favourites, favourite]);
  }
  function removeFavourite(name) {
    setFavourites(
      favourites.filter((fav) => {
        name !== fav;
      })
    );
  }
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
      <BrowserRouter>
        <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home pokemonList={pokemonList} />} />
            <Route path="/:name" element={<PokemonDetails />} />
          </Routes>
        </FavouritesContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export { App };
