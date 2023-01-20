function Home() {
  return (
    <div>
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
        {filteredPokemon.map((pokemon) => (
          <Col key={pokemon.name}>
            <PokemonCard url={pokemon.url} name={pokemon.name} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
