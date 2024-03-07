import { useState } from 'react';
import { useEffect } from 'react';
import getPokemons from './getPokemon';
import Card from './components/Card.jsx';

function App() {
  const [pokemons, setPokemons] = useState([]);

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
      {pokemons.map((pokemon) => (
        <Card pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
}

export default App;
