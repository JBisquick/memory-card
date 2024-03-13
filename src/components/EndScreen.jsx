import lose from '../public/lose.gif';
import win from '../public/win.gif';
import '../styles/EndScreen.css';

function EndScreen({ result, score, restart }) {
  return (
    <div className="end-container">
      {result === 'win' && (
        <>
          <img src={win} />
          <div>You Win!</div>
        </>
      )}
      {result === 'lose' && (
        <>
          <img src={lose} />
          <div>Game Over!</div>
        </>
      )}
      <div>Final Score: {score}</div>
      <button onClick={restart} className="button">
        Play Again
      </button>
    </div>
  );
}

export default EndScreen;
