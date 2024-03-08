import { useState } from 'react';
import { useEffect } from 'react';
import { getPokemons, shufflePokmeon } from './getPokemon';
import Card from './components/Card.jsx';
import './styles/Main.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);

  function playRound(pokemon) {
    if (pokemon.visited === false) {
      setScore(score + 1)
      pokemon.visited = true;

      const newPokemonList = shufflePokmeon(pokemons);
      setPokemons(newPokemonList);
    }
  }

  useEffect(() => {
    let loadPokemon = true;

    const fetchData = async () => {
      const data = await getPokemons(8);
      if (loadPokemon === true) {
        setPokemons(data);
      }
    };

    fetchData();

    return () => (loadPokemon = false);
  }, []);

  return (
    <div>
      <div>Score: {score}</div>
      <div className='cards-container'>
      {pokemons.map((pokemon) => (
        <Card pokemon={pokemon} key={pokemon.id} onClick={playRound} />
      ))}
      </div>
    </div>
  );
}

export default App;
