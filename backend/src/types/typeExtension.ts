// src/interfaces/express.d.ts

import { Document } from 'mongoose'; // Import Document from Mongoose
// import { File } from 'multer'; // Import Multer.File type
import { Express,Request } from 'express';

declare module 'express' {
  interface Request {
    id?: string; // Optional property 'id'
    // user: Document<any, any, any> | null; // Adjust Document based on your actual User model type
    // file: Express.Multer.File; // Multer.File type for file uploads
  }
}
