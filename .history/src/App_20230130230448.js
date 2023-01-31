import React, { useEffect, useState, useRef, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { Home, PokemonDetails, Favourites } from './routes';

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
      <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home pokemonList={pokemonList} />} />
            <Route path="/:name" element={<PokemonDetails />} />
            <Route
              path="/favourites"
              element={<Favourites pokemonList={pokemonList.filter((p) => favourites.includes(p.name))} />}
            />
          </Routes>
        </BrowserRouter>
      </FavouritesContext.Provider>
    </React.StrictMode>
  );
}

export { App };
