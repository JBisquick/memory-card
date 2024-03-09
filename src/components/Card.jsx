import '../styles/Card.css';

function Card({ pokemon, onClick }) {
  return (
    <button
      className="card-container"
      onClick={() => {
        onClick(pokemon);
      }}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </button>
  );
}

export default Card;
