import { useState, useEffect } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PokemonCard } from '../components/PokemonCard';

export function Home({ pokemonList }) {
  const [filteredPokemon, setFilteredPokemon] = useState(pokemonList);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   setFilteredPokemon(pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase())));
  // }, [search, pokemonList]);

  return (
    <div>
      <Container>
        <Row className="mb-4">
          <Col sm="8" md="6" className="mx-auto">
            <InputGroup>
              <InputGroup.Text id="search">Search</InputGroup.Text>
              <FormControl
                value={search}
                aria-label="search"
                aria-describedby="search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <h1>Pokedex</h1>
        <Row className="g-4">
          {pokemonList &&
            pokemonList.map((pokemon) => (
              <Col key={pokemon.name}>
                <PokemonCard url={pokemon.url} name={pokemon.name} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
