import { Request, Response, NextFunction } from "express";
import mongoose, { ClientSession } from "mongoose";
import UserService from "../services/user.service";
import AppError from "../utils/errorHandler";
import StatusConstants from "../constant/statusConstant";
import { StatusCode } from "../enum/statusCode";

export default class UserClontroller {
    public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, email, password, role } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const newUser = await UserService.createUser(username, email, password, role, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.CREATED).json(newUser);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void>{
        const userId:string = req.params.id;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const user = await UserService.getUserById(userId, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.OK).json(user);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.params.id;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await UserService.deleteUser(userId, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.NO_CONTENT).send();
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.params.id;
        const { username, email, password } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const updatedUser = await UserService.updateUser(userId, username, email, password, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.OK).json(updatedUser);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const {user, totaluser} = await UserService.getAllUsers(session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.OK).json({user, totaluser});
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const session = await mongoose.startSession();
        await session.startTransaction();
        try {
            const { email, password } = req.body;
            const user = await UserService.login(email, password, session);            
            await session.commitTransaction();
            await session.endSession();
            res.status(StatusCode.OK).json({ user });
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            next(error)
        }
    }

    public static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        const session = await mongoose.startSession();
        await session.startTransaction();
        try {
            const { userId } = req.params;
            const user = await UserService.logout(userId, session);            
            await session.commitTransaction();
            await session.endSession();
            res.status(StatusCode.OK).json({user});
        } catch (error:any) {
            await session.abortTransaction();
            await session.endSession();
            next(error)
        }
    }

}

