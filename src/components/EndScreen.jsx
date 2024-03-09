function EndScreen({ result, score, restart }) {
  return (
    <div>
      {result === 'win' && <div>You Win!</div>}
      {result === 'lose' && <div>Game Over!</div>}
      <div>Final Score: {score}</div>
      <button onClick={restart}>Play Again</button>
    </div>
  );
}

export default EndScreen;
