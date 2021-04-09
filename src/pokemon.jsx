const Pokemon = ({ image, name, id, disabled = false, onClick, btnText }) => {
  return (
    <div>
      <img src={image} alt={name} />
      <p>{id}</p>
      <p>{name}</p>
      <button onClick={onClick} disabled={disabled}>
        {btnText}
      </button>
    </div>
  )
}

export default Pokemon
