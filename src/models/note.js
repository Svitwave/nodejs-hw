import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      // було tittle → помилка
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
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo', // необов’язкове, за замовчуванням Todo
    },
  },
  { timestamps: true }, // автоматично додає createdAt та updatedAt
);

export const Note = mongoose.model('Note', noteSchema);
