import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
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

  useEffect(() => {
    setFilteredPokemon(pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase())));
  }, [search, pokemonList]);

  return (
    <div data-testid="app">
      <Navigation />

      <Container>
        
      </Container>
    </div>
  );
}

export { App };
