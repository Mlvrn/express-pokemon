import express from 'express';
import {
  catchPokemon,
  getMyPokemons,
  getPokemonDetail,
  getWildPokemons,
  releasePokemon,
  renamePokemon,
  seedPokemon,
} from '../controllers/index.js';
const router = express.Router();

router.post('/seed', seedPokemon);
router.get('/all/wild', getWildPokemons);
router.get('/all/my', getMyPokemons);
router.get('/:id', getPokemonDetail);
router.post('/catch/:id', catchPokemon);
router.post('/release/:id', releasePokemon);
router.patch('/rename/:id', renamePokemon);

export default router;
