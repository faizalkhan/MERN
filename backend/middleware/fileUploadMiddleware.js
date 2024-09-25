const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      debugger;
      const uploadPath = path.join(__dirname, '..', 'uploads/');
      cb(null, uploadPath); // Folder where the files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    },
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload;
