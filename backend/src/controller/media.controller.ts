// // controllers/media.controller.ts

// import express, { Request, Response, NextFunction } from 'express';
// import mongoose, { ClientSession,Schema, Types } from 'mongoose';
// import MediaService from '../services/media.service';
// import AppError from '../utils/errorHandler';
// import StatusConstants from '../constant/statusConstant';
// import { StatusCode } from '../enum/statusCode';
// import { SECRET_KEY } from '../config/config';
// import jwt from 'jsonwebtoken';

// // interface RequestWithSession extends Request {
// //     session: {userId: string}; // Adjust Document based on your actual session structure
// // }

// export default class MediaController {
//     public static async createMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
//         const { filename, originalname, mimetype, size } = req.body;
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             throw new AppError(
//                 'Authorization token not provided',
//                 StatusConstants.UNAUTHORIZED.httpStatusCode
//             );
//         }
//         const token = authHeader.split(' ')[1];
//         const decoded: any = jwt.verify(token, 'keys');
//         const userId: string = decoded.id;
//         const session = await mongoose.startSession();
//         session.startTransaction();

//         try {
//             const newMedia = await MediaService.createMedia(filename, originalname, mimetype, size, userId, session);
//             await session.commitTransaction();
//             session.endSession();
//             res.status(StatusCode.CREATED).json(newMedia);
//         } catch (error) {
//             await session.abortTransaction();
//             session.endSession();
//             next(error);
//         }
//     }

//     public static async getMediaById(req: Request, res: Response, next: NextFunction): Promise<void> {
//         const mediaId = req.params.id;
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         try {
//             const media = await MediaService.getMediaById(mediaId, session);
//             await session.commitTransaction();
//             session.endSession();
//             res.status(StatusCode.OK).json(media);
//         } catch (error) {
//             await session.abortTransaction();
//             session.endSession();
//             next(error);
//         }
//     }

//     public static async deleteMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
//         const mediaId = req.params.id;
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         try {
//             await MediaService.deleteMedia(mediaId, session);
//             await session.commitTransaction();
//             session.endSession();
//             res.status(StatusCode.NO_CONTENT).send();
//         } catch (error) {
//             await session.abortTransaction();
//             session.endSession();
//             next(error);
//         }
//     }

//     public static async updateMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
//         const mediaId = req.params.id;
//         const { filename, originalname, mimetype, size } = req.body;
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         try {
//             const updatedMedia = await MediaService.updateMedia(mediaId, filename, originalname, mimetype, size, session);
//             await session.commitTransaction();
//             session.endSession();
//             res.status(StatusCode.OK).json(updatedMedia);
//         } catch (error) {
//             await session.abortTransaction();
//             session.endSession();
//             next(error);
//         }
//     }

//     public static async getAllMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         try {
//             const allMedia = await MediaService.getAllMedia(session);
//             await session.commitTransaction();
//             session.endSession();
//             res.status(StatusCode.OK).json(allMedia);
//         } catch (error) {
//             await session.abortTransaction();
//             session.endSession();
//             next(error);
//         }
//     }
// }

