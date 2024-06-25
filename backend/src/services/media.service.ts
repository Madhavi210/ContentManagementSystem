
// import { ClientSession } from 'mongoose';
// import Media from '../models/media.model';
// import { IMedia } from '../interface/media.interface';
// import AppError from '../utils/errorHandler';
// import mongoose ,{ Schema} from 'mongoose';
// import StatusConstants from '../constant/statusConstant';
// import Path from 'path';
// import fs from 'fs/promises';


// export default class ContentService {

//     public static async createMedia(filename: string, originalname: string, mimetype: string, size: number, filePath:Express.Multer.filePath, author: string , session: ClientSession): Promise<IMedia> {
//         const newMedia = new Media({
//             filename,
//             originalname,
//             mimetype,
//             size,
//             filePath,
//             author
//         });
//         await newMedia.save({ session });
//         return newMedia.toObject(); 
//     }

//     public static async getMediaById(id: string, session: ClientSession): Promise<IMedia> {
//         const media = await Media.findById(id).session(session);
//         if (!media) {
//             throw new AppError(
//                 StatusConstants.NOT_FOUND.body.message,
//                 StatusConstants.NOT_FOUND.httpStatusCode
//             );
//         }
//         return media.toObject();
//     }

//     public static async deleteMedia(id: string, session: ClientSession): Promise<void> {
//         const deletedMedia = await Media.findByIdAndDelete(id).session(session);
//         if (!deletedMedia) {
//             throw new AppError(
//                 StatusConstants.NOT_FOUND.body.message,
//                 StatusConstants.NOT_FOUND.httpStatusCode
//             );
//         }
//         return;
//     }

//     public static async updateMedia(id: string, filename: string, originalname: string, mimetype: string, size: number, session: ClientSession): Promise<IMedia | null> {
//         const updatedMedia = await Media.findByIdAndUpdate(
//             id,
//             { filename, originalname, mimetype, size },
//             { new: true }
//         ).session(session);
//         return updatedMedia ? updatedMedia.toObject() : null;
//     }

//     public static async getAllMedia(session: ClientSession): Promise<IMedia[]> {
//         const media = await Media.find({}).session(session);
//         return media.map(m => m.toObject());
//     }

// }
