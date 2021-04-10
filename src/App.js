import { useState, useEffect } from 'react'
import Pokemon from './pokemon'

const URL = 'https://pokeapi.co/api/v2/pokemon/'

const api = async pokemonName => {
  const response = await fetch(`${URL}${pokemonName}`)
  const result = await response.json()
  return result
}

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


  const handlePokemonTextInput = e => {
    setPokemonTextInput(e.target.value.toLowerCase())
  }

  const handleSearchPokemon = async () => {
    try {
      const history = pokemonHistory.find(({ name }) => name === pokemonTextInput)
      if (history) {
        setPokemon(history)
      } else {
        const result = await api(pokemonTextInput)
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
    if (pokemonStore.length < 6)
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
            pokemon={pokemon}
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
              pokemon={pkmn}
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
