

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => {
      const supportedFormats = ['jpeg', 'jpg', 'png', 'gif'];
      const format = supportedFormats.find(f => file.mimetype.includes(f));
      if (format) {
        return format;
      } else {
        return 'png';
      }
    },
    public_id: (req, file) => `user_avatar_${Date.now()}`,
  }
});

// Filter image files
const fileFilter = (req, file, callback) => {
  const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  if (supportedFormats.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Only JPEG, PNG, and JPG files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
