import Joi from 'joi';

export const UserSpec = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const UserCredentialsSpec = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const PlaylistSpec = Joi.object({
  title: Joi.string().min(1).required(),
});

export const TrackSpec = Joi.object({
  title: Joi.string().min(1).required(),
  artist: Joi.string().min(1).required(),
  duration: Joi.number().min(0).optional().empty(''),
});
