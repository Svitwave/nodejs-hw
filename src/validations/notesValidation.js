import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
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
