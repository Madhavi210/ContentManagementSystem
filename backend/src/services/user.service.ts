import mongoose, { ClientSession } from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import IUser from "../interface/user.interface";
import AppError from "../utils/errorHandler";
import StatusConstants from "../constant/statusConstant";
import { SECRET_KEY } from "../config/config";
import jwt from "jsonwebtoken";

export default class UserService {

    public static async createUser(username: string, email: string, password: string, role: string, session: ClientSession): Promise<IUser> {
            const existingUser = await User.findOne({ email }).session(session);
            if (existingUser) {
                throw new AppError(
                    StatusConstants.DUPLICATE_KEY_VALUE.body.message,
                    StatusConstants.DUPLICATE_KEY_VALUE.httpStatusCode
                );
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role,
            });
            await newUser.save({ session });
            return newUser.toObject(); // Convert Mongoose document to plain object
    }

    public static async getUserById(id: string, session: ClientSession): Promise<IUser> {
            const user = await User.findById(id).session(session);
            if (!user) {
                throw new AppError(
                    StatusConstants.NOT_FOUND.body.message,
                    StatusConstants.NOT_FOUND.httpStatusCode
                );
            }
            return user.toObject();
    }

    public static async deleteUser(id: string, session: ClientSession): Promise<void> {
            const deletedUser = await User.findByIdAndDelete(id).session(session);
            if (!deletedUser) {
                throw new Error("User not found");
            }
            console.log("deteted user",deletedUser);
            return deletedUser?.toObject();
    }

    public static async updateUser(id: string, username: string, email: string, password: string, session: ClientSession): Promise<IUser | null> {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { username, email, password },
                { new: true }
            ).session(session);
            return updatedUser ? updatedUser.toObject() : null;
    }

    public static async getAllUsers(session: ClientSession): Promise<IUser[]> {
            const users = await User.find({}).session(session);
            return users.map(user => user.toObject());
    }

    public static async login (email:string, password:string,session:ClientSession):Promise<object>{
        const user = await User.findOne({email: email}).session(session);
        if (!user) {
            throw new AppError(
              StatusConstants.NOT_FOUND.body.message,
              StatusConstants.NOT_FOUND.httpStatusCode
            );
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new AppError(
              StatusConstants.INVALID_DATA.body.message,
              StatusConstants.INVALID_DATA.httpStatusCode
            );
          }
          if (!SECRET_KEY) {
            throw new AppError(
              StatusConstants.NOT_FOUND.body.message,
              StatusConstants.NOT_FOUND.httpStatusCode
            );
          }
          const token = await jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: "10h",
          });
          user.token = token;
          
          await user.save({ session });
          return {
            token: user.token,
            id: user._id,
            role: user.role
          };
    }

    public static async logout(userId:string, session:ClientSession):Promise<void>{
        const updatedUser = await User.findByIdAndUpdate(userId, {token:''}, {new: true}).session(session)
        console.log(updatedUser);  //null
        
        if (!updatedUser) {
          throw new AppError('User not found', 404);
        }
        return updatedUser.toObject();
    }
}
