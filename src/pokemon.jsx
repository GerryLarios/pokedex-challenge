const Pokemon = ({ pokemon, disabled = false, onClick, btnText }) => (
  <div>
    <img src={pokemon.image} alt={pokemon.name} />
    <p>{pokemon.id}</p>
    <p>{pokemon.name}</p>
    <button onClick={onClick} disabled={disabled}>
      {btnText}
    </button>
  </div>
)


export default Pokemon
