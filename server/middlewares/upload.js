const multer = require("multer");

// Files stored temporarily before uploading to Cloudinary
const storage = multer.diskStorage({});

const upload = multer({ storage });

module.exports = upload;
