import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images allowed'));
    }
    cb(null, true);
  },
});

// обмежений формат файлів

// export const uploads = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },
//   fileFilter: (req, file, cb) => {
//     const filTypes = ['image/png', 'image/jpeg'];

//     if (filTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('invalid file type'));
//     }
//   },
// });
