// src/validations/authValidation.js

import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

// Решта коду файла

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

//Перевіряємо, що в тілі є коректний email для запиту на відновлення пароля

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
};
