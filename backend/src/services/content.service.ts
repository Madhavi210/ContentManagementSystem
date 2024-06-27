// services/content.service.ts

import { ClientSession } from "mongoose";
import Content from "../models/content.model";
import { IContent, IMedia } from "../interface/content.interface";
import AppError from "../utils/errorHandler";
import StatusConstants from "../constant/statusConstant";
import { Express } from "express";

export default class ContentService {
  public static async createContent(
    title: string,
    body: string,
    uploadedBy: string,
    file: Express.Multer.File,
    session: ClientSession
  ): Promise<IContent> {
    const { filename, path, mimetype, size } = file;
    const newContent = new Content({
      title,
      body,
      uploadedBy,
      media: {
        filename,
        path,
        mimetype,
        size,
    },
    });
    await newContent.save({ session });
    return newContent.toObject();
  }

  public static async getContentById(id: string): Promise<IContent | null> {
    return Content.findById(id).populate("uploadedBy").exec();
  }

  public static async updateContent(
    id: string,
    title: string,
    body: string,
    media: IMedia | undefined,
    session: ClientSession
  ): Promise<IContent | null> {
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      {
        title,
        body,
        media,
      },
      { new: true, session }
    ).populate("uploadedBy").exec();

    return updatedContent ? updatedContent.toObject() : null;
  }

  public static async deleteContent(id: string, session: ClientSession): Promise<void> {
    const deletedContent = await Content.findByIdAndDelete(id).session(session);
    if (!deletedContent) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
  }

  public static async getAllContent(): Promise<IContent[]> {
    return Content.find().populate("uploadedBy").exec();
  }
}
