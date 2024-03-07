import '../styles/Card.css';

function Card({ pokemon }) {
  return (
    <button className="card-container">
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </button>
  );
}

export default Card;
