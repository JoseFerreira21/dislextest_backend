import * as Joi from 'joi';

const configSchema = Joi.object({
  API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().hostname().required(),
});

export default configSchema;