import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { getPokemons, shufflePokmeon } from './getPokemon';
import Card from './components/Card.jsx';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import loadingGif from './public/pikachu-running.gif';
import './styles/Main.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
  const [gameState, setGameState] = useState('start');
  const [flip, setFlip] = useState(true);
  const [loading, setLoading] = useState(false);
  const [gameMode, setGameMode] = useState(8);

  function setDifficulty(e) {
    if (e.target.textContent === 'Easy') {
      setGameMode(8);
    } else if (e.target.textContent === 'Medium') {
      setGameMode(14);
    } else {
      setGameMode(20);
    }
  }

  function startGame() {
    setGameState('play');
  }

  function flipCards(pokemon) {
    setFlip(true);

    // Set a bit of time before finishing the first animation
    // and starting the second one for loading the round
    setTimeout(() => {
      playRound(pokemon);
    }, 550);

    setTimeout(() => {
      setFlip(false);
    }, 700);
  }

  function playRound(pokemon) {
    if (pokemon.visited === true) {
      setGameState('lose');
    } else if (pokemon.visited === false) {
      pokemon.visited = true;
      setScore(score + 1);

      const newPokemonList = shufflePokmeon(pokemons);
      setPokemons(newPokemonList);

      if (score + 1 === gameMode.current) {
        setGameState('win');
      }
    }
    if (score > highScore) {
      localStorage.setItem('highScore', score);
      setHighScore(score + 1);
    }
  }

  function restartGame() {
    setGameState('start');
    setScore(0);
    setPokemons([]);
  }

  useEffect(() => {
    let loadPokemon = true;

    const fetchData = async () => {
      if (loadPokemon === true && gameState === 'play') {
        // To start loading animation with back card
        setFlip(true);
        setLoading(true);
        setTimeout(async () => {
          const data = await getPokemons(gameMode);
          setLoading(false);
          setPokemons(data);

          setTimeout(() => {
            // flip once loaded
            setFlip(false);
          }, 100);
        }, 500);
      }
    };

    fetchData();

    return () => (loadPokemon = false);
  }, [gameState]);

  return (
    <div className='container'>
      {gameState === 'start' && <StartScreen setDifficulty={setDifficulty} start={startGame} difficulty={gameMode} />}
      {loading === true && (
        <div>
          <img src={loadingGif} alt="" />
          <div>LOADING</div>
        </div>
      )}
      {gameState === 'play' && !loading && (
        <div>
          <div>Score: {score}</div>
          <div>High Score: {highScore}</div>
          <div className="cards-container">
            {pokemons.map((pokemon) => (
              <Card pokemon={pokemon} key={pokemon.id} onClick={flipCards} flip={flip} />
            ))}
          </div>
        </div>
      )}
      {gameState === 'lose' && <EndScreen result={gameState} score={score} restart={restartGame} />}
      {gameState === 'win' && <EndScreen result={gameState} score={score} restart={restartGame} />}
    </div>
  );
}

export default App;
