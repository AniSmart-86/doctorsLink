const multer = require('multer');
const { join } = require('path');

// Set upload directory
const uploadDir = join(__dirname, 'uploads');

// Set storage engine
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
