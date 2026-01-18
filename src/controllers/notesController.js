import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 15,
    // totalNotes = 150,
    // totalPages = 10,
    tag,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  // const filter = {};


  // const skip = (page - 1) * perPage;
  let notesQuery = Note.find();




  if (tag) {
    notesQuery = notesQuery.where('tag').equals(tag);
  }

  if (search) {
    notesQuery = notesQuery.where('title').regex(new RegExp(search, 'i'));
  }

 const [totalNotes, notes] = await Promise.all([
   notesQuery.clone().countDocuments(),
   notesQuery
     .skip(skip)
     .limit(perPageNumber)
     .sort({ [sortBy]: sortOrder }),

 ]);
 const totalPages = Math.ceil(totalNotes / perPageNumber);



  // const notes = await Note.find();
  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    // return res.status(404).json({ message: 'Note not found' });
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const notes = await Note.create(req.body);
  res.status(201).json(notes);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};
