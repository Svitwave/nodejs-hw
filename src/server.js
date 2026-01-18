// src/server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
// import { Note } from '../models/note.js';
import helmet from 'helmet';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors } from 'celebrate';
import notesRouter from './routes/notesRoutes.js';
const app = express();
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger); // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors()); // 3. Дозвіл для запитів з інших доменів
app.use(helmet()); // 4. Безпека HTTP-заголовків

app.use((req, res, next) => {
  // console.log('app.use', `${req.method} ${req.url}`);
  next();
});

app.use(notesRouter);
// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

// Валідація — обробка помилок від celebrate
app.use(errors());

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
