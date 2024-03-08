function StartScreen({ setDifficulty, start }) {
  
  return (
    <div>
      <div>
        <button onClick={setDifficulty} >Easy</button>
        <button onClick={setDifficulty} >Medium</button>
        <button onClick={setDifficulty} >Hard</button>
      </div>
      <button onClick={start} >Start Game</button>
    </div>
  );
}

export default StartScreen;