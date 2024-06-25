// interface/content.interface.ts

import {Schema, Document } from "mongoose";

export interface IMedia {
  filename: string;
  path: string;
  mimetype: string;
  size: number;
}

export interface IContent extends Document {
  title: string;
  body: string;
  uploadedBy: Schema.Types.ObjectId; // Assuming uploadedBy is the ObjectId of the User who uploaded the content
  media?: IMedia; // Optional field for media
  createdAt: Date;
  updatedAt: Date;
}
