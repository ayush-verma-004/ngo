const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'divya-jyoti-ngo',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage: storage });

const getPublicIdFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    const afterUpload = parts.slice(uploadIndex + 1);
    let startIndex = 0;
    if (afterUpload[0] && afterUpload[0].startsWith('v') && !isNaN(afterUpload[0].substring(1))) {
        startIndex = 1;
    }
    const pathWithExtension = afterUpload.slice(startIndex).join('/');
    const publicId = pathWithExtension.substring(0, pathWithExtension.lastIndexOf('.'));
    return publicId;
};

module.exports = { cloudinary, upload, getPublicIdFromUrl };
