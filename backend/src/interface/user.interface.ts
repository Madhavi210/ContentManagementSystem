import mongoose, { Document, Types } from "mongoose";
export default interface IUser extends Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
  token: string;
}