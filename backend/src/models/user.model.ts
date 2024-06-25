import mongoose, { Schema, Document, Types } from "mongoose";
import IUser from "../interface/user.interface";
import { UserRoles } from "../enum/userRole";

const userSchema = new Schema<IUser>(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        default: null,
      },
      role: {
        type: String,
        enum: Object.values(UserRoles),
        default : UserRoles.Viewer
      } ,
    },
    {
      timestamps: true,
    }
  );
  
  const User = mongoose.model<IUser>("User", userSchema);
  export default User;
  