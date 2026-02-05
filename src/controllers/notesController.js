import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 15,
    tag,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  let notesQuery = Note.find({ userId: req.user._id });

  if (tag) {
    notesQuery = notesQuery.where('tag').equals(tag);
  }

  if (search) {
    notesQuery = notesQuery.find({ $text: { $search: search } });
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery
      .skip(skip)
      .limit(perPageNumber)
      .sort({ [sortBy]: sortOrder }),
  ]);
  const totalPages = Math.ceil(totalNotes / perPageNumber);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id }, // Шукаємо по id

    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};
