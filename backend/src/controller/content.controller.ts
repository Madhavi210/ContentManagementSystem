// controllers/content.controller.ts

import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ContentService from "../services/content.service";
import AppError from "../utils/errorHandler";
import StatusConstants from "../constant/statusConstant";
import { IMedia } from "../interface/content.interface";
import { StatusCode } from "../enum/statusCode";

export default class ContentController {
  public static async createContent(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, body, uploadedBy } = req.body;
    // const uploadedBy = req.user?._id;
    if (!uploadedBy) {
        throw new AppError('User ID not found in request', StatusCode.UNAUTHORIZED);
    }

    const file = req.file as Express.Multer.File; // Type assertion to Multer.File
    if (!file) {
      throw new AppError('File not uploaded', StatusCode.BAD_REQUEST);
    }
    console.log(req.file);
    

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

      const newContent = await ContentService.createContent(title, body, uploadedBy, file, session);
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.CREATED).json(newContent);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }

  public static async getContentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const contentId = req.params.id;

    try {
      const content = await ContentService.getContentById(contentId);
      if (!content) {
        throw new AppError(
          StatusConstants.NOT_FOUND.body.message,
          StatusConstants.NOT_FOUND.httpStatusCode
        );
      }
      res.status(StatusCode.OK).json(content);
    } catch (error) {
      next(error);
    }
  }

  public static async updateContent(req: Request, res: Response, next: NextFunction): Promise<void> {
    const contentId = req.params.id;
    const { title, body } = req.body;
    let { filename, path, mimetype, size } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let media: IMedia | undefined = undefined;

      if (filename && path && mimetype && size) {
        media = {
          filename,
          path,
          mimetype,
          size,
        };
      }

      const updatedContent = await ContentService.updateContent(contentId, title, body, media, session);
      if (!updatedContent) {
        throw new AppError(
          StatusConstants.NOT_FOUND.body.message,
          StatusConstants.NOT_FOUND.httpStatusCode
        );
      }
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.OK).json(updatedContent);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }

  public static async deleteContent(req: Request, res: Response, next: NextFunction): Promise<void> {
    const contentId = req.params.id;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await ContentService.deleteContent(contentId, session);
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }

  public static async getAllContent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allContent = await ContentService.getAllContent();
      res.status(StatusCode.OK).json(allContent);
    } catch (error) {
      next(error);
    }
  }
}
