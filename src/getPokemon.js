import { v4 as uuidv4 } from 'uuid';

async function getPokemons(count) {
  const possiblePokemon = 1025;
  let pokemonList = [];
  let usedPokemon = [];

  for (let i = 0; i < count; ) {
    let pokemonIndex = Math.floor(Math.random() * possiblePokemon) + 1;

    if (checkPokeRepeat(usedPokemon, pokemonIndex) === false) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
      let newPokemon = await response.json();

      pokemonList.push({
        name: newPokemon.name,
        image: newPokemon.sprites.front_default,
        id: uuidv4(),
        visited: false
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

function shufflePokmeon(pokemonList) {
  let newList = [];
  const pokemonCount = pokemonList.length;
  for (let i = 0; i < pokemonCount; i++) {
    let randomIndex = Math.floor(Math.random() * pokemonList.length);
    let randomPokemon = pokemonList.splice(randomIndex, 1);
    newList.push(randomPokemon[0]);
  }
  return newList;
}

export { getPokemons, shufflePokmeon };
