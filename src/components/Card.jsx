import '../styles/Card.css';

function Card({ pokemon }) {
  return (
    <div className="card-container">
      <img src={pokemon.image} alt={pokemon.name} />
      <div>{pokemon.name}</div>
    </div>
  );
}

export default Card;
