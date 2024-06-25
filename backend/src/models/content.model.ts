import mongoose, { Schema } from "mongoose";
import { IContent } from "../interface/content.interface";
import User from "./user.model";

const contentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      filename: String,
      path: String,
      mimetype: String,
      size: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model<IContent>("Content", contentSchema);
export default Content;
