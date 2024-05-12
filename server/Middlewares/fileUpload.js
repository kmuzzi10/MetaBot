// import express from 'express';
// import multer from 'multer';
// const upload = multer({ dest: './files' });


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './files')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, uniqueSuffix+file.originalname)
//     }
//   })

// export default storage