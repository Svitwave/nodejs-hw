import { Joi, Segments } from 'celebrate';
import { TAGS } from '../contacts/tags.js';
import mongoose from 'mongoose';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().allow(''),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom((value, helpers) => {
      if (!mongoose.isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectId Validation'),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom((value, helpers) => {
      if (!mongoose.isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectId Validation'),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }).or('title', 'content', 'tag'),
};

export const createStudentSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have at least {#limit} characters',
      'string.max': 'Name should have at most {#limit} characters',
      'any.required': 'Name is required',
    }),
    age: Joi.number().integer().min(12).max(65).required().messages({
      'number.base': 'Age must be a number',
      'number.min': 'Age must be at least {#limit}',
      'number.max': 'Age must be at most {#limit}',
      'any.required': 'Age is required',
    }),
  }),
};
