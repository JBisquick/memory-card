import '../styles/StartScreen.css';

function StartScreen({ setDifficulty, start, difficulty }) {
  return (
    <div className="start-container">
      <button className="start" onClick={start}>
        <span className="front-start">Start Game</span>
      </button>
      <div className='button-container'>
        <button onClick={setDifficulty} className="easy">
          <span className={`front-easy ${difficulty === 8 ? 'pressed' : ''}`}>Easy</span>
        </button>
        <button onClick={setDifficulty} className="medium">
          <span className={`front-medium ${difficulty === 14 ? 'pressed' : ''}`}>Medium</span>
        </button>
        <button onClick={setDifficulty} className="hard">
          <span className={`front-hard ${difficulty === 20 ? 'pressed' : ''}`}>Hard</span>
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
