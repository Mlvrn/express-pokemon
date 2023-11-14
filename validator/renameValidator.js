import joi from 'joi';

const renamePokemonSchema = joi.object({
  name: joi.string().trim().min(3).messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of 3 character',
  }),
});

export const validateRenamePokemon = (body) => {
  return renamePokemonSchema.validate(body);
};
