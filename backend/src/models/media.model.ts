// import mongoose, { Schema, model, Document } from "mongoose";
// import { IMedia } from "../interface/media.interface";
// import User from "./user.model";

// //Manages multimedia assets like images, videos, and other 
// const mediaSchema = new Schema<IMedia>(
//   {
//     title: {
//         type: String,
//         required: true
//     },
//     body: {  
//         type: String,
//         required: true
//     },
//     uploadedBy: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     filename: {
//         type: String,
//     },
//     path: {
//         type: String,
//     },
//     mimetype: {
//         type: String,
//     },
//     size: {
//         type: Number,
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// const Media = mongoose.model<IMedia>("Media", mediaSchema);
// export default Media;
