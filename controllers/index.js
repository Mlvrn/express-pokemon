import { callApi } from '../domain/api.js';
import { v4 as uuidv4 } from 'uuid';
import {
  handleResponse,
  handleServerError,
} from '../helpers/responseHelper.js';
import { loadData, storeData } from '../helpers/databaseHelper.js';
import { fibonacci, isPrime } from '../helpers/mathHelper.js';
import { validateRenamePokemon } from '../validator/renameValidator.js';

const data = loadData();

export const seedPokemon = async (req, res) => {
  try {
    if (!data.wildPokemons || data.wildPokemons.length === 0) {
      const response = await callApi('pokemon?limit=100&offset=0');
      const pokemonList = response.results.map((pokemon) => ({
        id: uuidv4(),
        name: pokemon.name,
      }));

      data.wildPokemons = pokemonList;

      storeData(data);
      return handleResponse(res, 201, {
        data: pokemonList,
        message: 'Wild Pokemons seeded successfully!',
        status: 'Success',
      });
    } else {
      return handleResponse(res, 400, {
        message: 'Wild Pokemons already seeded.',
      });
    }
  } catch (error) {
    return handleServerError(res);
  }
};

export const getWildPokemons = async (req, res) => {
  try {
    const wildPokemons = data.wildPokemons || [];
    return handleResponse(res, 200, { data: wildPokemons, status: 'Success' });
  } catch (error) {
    return handleServerError(res);
  }
};

export const getMyPokemons = async (req, res) => {
  try {
    const myPokemons = data.myPokemons || [];
    return handleResponse(res, 200, { data: myPokemons, status: 'Success' });
  } catch (error) {
    return handleServerError(res);
  }
};

export const getPokemonDetail = async (req, res) => {
  try {
    const { id } = req.params;
    let selectedPokemon = data.wildPokemons.find(
      (pokemon) => pokemon.id === id
    );
    //If not found in wild, find in my pokemons
    if (!selectedPokemon) {
      selectedPokemon = data.myPokemons.find((pokemon) => pokemon.id === id);
    }

    if (!selectedPokemon) {
      return handleResponse(res, 404, { message: 'Pokemon not found.' });
    }
    const pokemonDetail = await callApi(`pokemon/${selectedPokemon.name}`);

    const { name, abilities, height, weight, types, stats } = pokemonDetail;

    return handleResponse(res, 200, {
      data: { name, abilities, height, weight, types, stats },
      status: 'Success',
    });
  } catch (error) {
    return handleServerError(res);
  }
};

export const catchPokemon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!data.wildPokemons.some((pokemon) => pokemon.id === id)) {
      return handleResponse(res, 404, {
        message: 'Pokemon not found in the wild',
      });
    }
    const caughtPokemon = data.wildPokemons.find(
      (pokemon) => pokemon.id === id
    );

    const success = Math.random() < 0.5;

    if (success) {
      const removedIndex = data.wildPokemons.indexOf(caughtPokemon);

      data.wildPokemons.splice(removedIndex, 1);
      data.myPokemons.push({
        id: caughtPokemon.id,
        name: caughtPokemon.name,
        caughtAt: new Date().toLocaleString('id'),
        renameCount: 0,
      });

      storeData(data);
      return handleResponse(res, 201, {
        message: `${caughtPokemon.name} caught successfully!`,
        myPokemons: data.myPokemons,
      });
    } else {
      return handleResponse(res, 204, {
        message: `Failed to catch ${caughtPokemon.name}.`,
        myPokemons: data.myPokemons,
      });
    }
  } catch (error) {
    return handleServerError(res);
  }
};

export const releasePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const releasedPokemon = data.myPokemons.find(
      (pokemon) => pokemon.id === id
    );
    if (!releasedPokemon) {
      return handleResponse(res, 404, {
        message: 'Pokemon not found in your Pokemon list.',
      });
    }
    const randomNum = Math.floor(Math.random() * 100) + 1;
    const isReleaseSuccessful = isPrime(randomNum);

    if (isReleaseSuccessful) {
      const removedIndex = data.myPokemons.indexOf(releasedPokemon);
      const originalName = releasedPokemon.name.split('-')[0];
      data.myPokemons.splice(removedIndex, 1);
      data.wildPokemons.push({
        id: releasedPokemon.id,
        name: originalName,
      });

      storeData(data);

      return handleResponse(res, 201, {
        message: `${releasedPokemon.name} released successfully!`,
        myPokemons: data.myPokemons,
      });
    } else {
      return handleResponse(res, 204, {
        message: `Failed to release ${releasedPokemon.name}.`,
        myPokemons: data.myPokemons,
      });
    }
  } catch (error) {
    return handleServerError(res);
  }
};

export const renamePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const renamedPokemon = data.myPokemons.find((pokemon) => pokemon.id === id);

    if (!renamedPokemon) {
      return handleResponse(res, 404, {
        message: 'Pokemon not found in your Pokemon list.',
      });
    }

    const oldName = renamedPokemon.name;
    let newName;

    const { error } = validateRenamePokemon(req.body);

    if (error) {
      return handleResponse(res, 400, {
        message: error.details[0].message,
      });
    }

    const newFibonacciSuffix = fibonacci(renamedPokemon.renameCount);

    if (req.body && req.body.name) {
      newName = `${req.body.name}-${
        newFibonacciSuffix === 0 ? '0' : newFibonacciSuffix
      }`;
    } else {
      newName = `${oldName.split('-')[0]}-${
        newFibonacciSuffix === 0 ? '0' : newFibonacciSuffix
      }`;
    }

    renamedPokemon.name = newName;
    renamedPokemon.renameCount++;

    storeData(data);

    return handleResponse(res, 200, {
      message: `${oldName} renamed to ${newName} successfully!`,
      myPokemons: data.myPokemons,
    });
  } catch (error) {
    return handleServerError(res);
  }
};
