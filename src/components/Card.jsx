import '../styles/Card.css';
import backCard from "../public/back-card.jpg"

function Card({ pokemon, onClick, flip }) {

  return (
    <div className={`card ${flip ? "flip" : ""}`} >
      <button
        className="front"
        onClick={() => {
          onClick(pokemon);
        }}
      >
        <img src={pokemon.image} alt={pokemon.name} />
        <p>{pokemon.name}</p>
      </button>
      <img className="back" src={backCard} />
    </div>
  );
}

export default Card;
