import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '', // необов’язкове, за замовчуванням порожнє
      trim: true,
    },
    tag: {
      type: String,
      enum: [...TAGS],
      default: 'Todo', // необов’язкове, за замовчуванням Todo
    },
  },
  { timestamps: true }, // автоматично додає createdAt та updatedAt
);
noteSchema.index({ title: 'text', content: 'text' });
export const Note = mongoose.model('Note', noteSchema);
