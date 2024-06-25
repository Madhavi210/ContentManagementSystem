// utils/fileUpload.ts

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


// Initialize multer upload
const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB limit
    // fileFilter: function (req, file, cb) {
    //     const filetypes = /jpeg|jpg|png|gif/;
    //     const mimetype = filetypes.test(file.mimetype);
    //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //     if (mimetype && extname) {
    //         return cb(null, true);
    //     }
    //     cb(new Error('Only images are allowed'));
    // }
});

// const upload = multer({ storage: storage }).single('file'); 

export default upload;

