import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { getPokemons, shufflePokmeon } from './getPokemon';
import Card from './components/Card.jsx';
import StartScreen from './components/StartScreen';
import './styles/Main.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start');
  let gameMode = useRef(8);

  function setDifficulty(e) {
    if (e.target.textContent === 'Easy') {
      gameMode.current = 8;
    } else if (e.target.textContent === 'Medium') {
      gameMode.current = 16;
    } else {
      gameMode.current = 24;
    }
  }

  function startGame() {
    setGameState('play')
  }

  function playRound(pokemon) {
    if (pokemon.visited === false) {
      pokemon.visited = true;
      setScore(score + 1)
      
      const newPokemonList = shufflePokmeon(pokemons);
      setPokemons(newPokemonList);
    }
  }

  useEffect(() => {
    let loadPokemon = true;

    const fetchData = async () => {
      const data = await getPokemons(gameMode.current);
      if (loadPokemon === true && gameState === 'play') {
        setPokemons(data);
      }
    };

    fetchData();

    return () => (loadPokemon = false);
  }, [gameState]);

  return (
    <div>
      {gameState === 'start' && <StartScreen setDifficulty={setDifficulty} start={startGame}/>}
      {gameState === 'play' && (
      <div>
        <div>Score: {score}</div>
        <div className='cards-container'>
        {pokemons.map((pokemon) => (
          <Card pokemon={pokemon} key={pokemon.id} onClick={playRound} />
        ))}
        </div>
      </div>)}
    </div>
  );
}

export default App;
