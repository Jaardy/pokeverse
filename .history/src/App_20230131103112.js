import React, { useEffect, useState, useRef, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { Home } from './routes/Home';
import { PokemonDetails } from './routes/PokemonDetails';

const FavouritesContext = createContext();

function App() {
  const [favourites, setFavourites] = useState();
  function addFavourites(name) {
    setFavourites([...favourites, name]);
  }
  function removeFavourites(name) {
    setFavourites(
      favourites.filter((favourite) => {
        return name != favourite;
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
      <FavouritesContext.Provider value={{ favourites, addFavourites, removeFavourites }}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home pokemonList={pokemonList} />} />
            <Route path="/:name" element={<PokemonDetails />} />
          </Routes>
        </BrowserRouter>
      </FavouritesContext.Provider>
    </React.StrictMode>
  );
}

export { App };
