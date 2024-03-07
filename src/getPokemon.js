import { v4 as uuidv4 } from 'uuid';

async function getPokemons(count) {
  const possiblePokemon = 1025;
  let pokemonList = [];
  let usedPokemon = [];

  for (let i = 0; i < count; ) {
    let pokemonIndex = Math.floor(Math.random() * possiblePokemon);

    if (checkPokeRepeat(usedPokemon, pokemonIndex) === false) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
      let newPokemon = await response.json();
      
      pokemonList.push({
        name: newPokemon.name,
        image: newPokemon.sprites.front_default,
        id: uuidv4()
      });
      usedPokemon.push(pokemonIndex);
      i++;
    }
  }

  return pokemonList;
}

function checkPokeRepeat(pokemonList, newPokemon) {
  for (const pokemon of pokemonList) {
    if (pokemon === newPokemon) {
      return true;
    }
  }
  return false;
}

export default getPokemons;
