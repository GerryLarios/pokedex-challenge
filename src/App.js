import { useState, useEffect } from 'react'
import Pokemon from './pokemon'

const URL = 'https://pokeapi.co/api/v2/pokemon/'

const pokemonParser = pokemon => ({
  image: pokemon.sprites.front_default,
  name: pokemon.name,
  id: pokemon.id
})

const App = () => {
  const [pokemonTextInput, setPokemonTextInput] = useState('')
  const [error, setError] = useState(false)
  const [pokemon, setPokemon] = useState()
  const [pokemonStore, setPokemonStore] = useState([])
  const [pokemonHistory, setPokemonHistory] = useState([])

  const provider = pokemonString => `${URL}${pokemonString}`

  const handlePokemonTextInput = e => {
    setPokemonTextInput(e.target.value.toLowerCase())
  }

  const handleSearchPokemon = async () => {
    try {
      const history = pokemonHistory.find(({ name }) => name === pokemonTextInput)
      if (history) {
        setPokemon(history)
      } else {
        const response = await fetch(provider(pokemonTextInput))
        const result = await response.json()
        const pkmn = pokemonParser(result)
        setPokemonHistory(prev => [...prev, pkmn])
        setPokemon(pkmn)
      }
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  const handleAddToStore = () => {
    setPokemonStore(prev => [...prev, pokemon])
  }

  const handleRemoveFromStore = pokemonId => {
    setPokemonStore(prev => prev.filter(({ id }) => id !== pokemonId))
  }

  useEffect(() => {
    if (error) setTimeout(() => setError(false), 5000)
  }, [error])

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
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            onClick={handleAddToStore}
            disabled={pokemonStore.length >= 6}
            btnText="Catch"
          />
        )}
        {error && <p>[ERROR] Unexpected input</p>}
        <hr />
        {pokemonStore.length === 0 ? (
          <p>Your party is empty</p>
        ) : (
          pokemonStore.map(pkmn => (
            <Pokemon
              id={pkmn.id}
              key={pkmn.id}
              name={pkmn.name}
              image={pkmn.image}
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
