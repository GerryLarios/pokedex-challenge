import { useState } from 'react'
import Pokemon from './pokemon'

const URL = 'https://pokeapi.co/api/v2/pokemon/'

const App = () => {
  const [pokemonTextInput, setPokemonTextInput] = useState('')
  const [pokemon, setPokemon] = useState()
  const [pokemonStore, setPokemonStore] = useState([])

  const provider = pokemonString => `${URL}${pokemonString}`

  const handlePokemonTextInput = e => {
    setPokemonTextInput(e.target.value)
  }

  const handleSearchPokemon = async () => {
    const response = await fetch(provider(pokemonTextInput))
    const result = await response.json()
    setPokemon(result)
  }

  const handleAddToStore = () => {
    setPokemonStore(prev => [...prev, pokemon])
  }

  const handleRemoveFromStore = pokemonId => {
    setPokemonStore(prev => prev.filter(({ id }) => id !== pokemonId))
  }

  return (
    <>
      <header>
        <input placeholder="Pokemon" type="text" onChange={handlePokemonTextInput} />
        <button onClick={handleSearchPokemon}>
          Find
        </button>
      </header>
      <section>
        {pokemon && (
          <Pokemon
            image={pokemon.sprites.front_default}
            name={pokemon.name}
            id={pokemon.id}
            onClick={handleAddToStore}
            disabled={pokemonStore.length >= 6}
            btnText="Catch"
          />
        )}
        <hr />
        {pokemonStore.length === 0 ? (
          <p>Your party is empty</p>
        ) : (
          pokemonStore.map(pkmn => (
            <Pokemon
              key={pkmn.id}
              image={pkmn.sprites.front_default}
              name={pkmn.name}
              id={pkmn.id}
              onClick={() => handleRemoveFromStore(pkmn.id)}
              btnText="Delete"
            />
          ))
        )}
      </section>
    </>
  );
}

export default App;
