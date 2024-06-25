import { SECRET_KEY } from "../config/config";
import TokenPayload from "../interface/user.interface";
import jwt from "jsonwebtoken";
import "../types/typeExtension";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export default class Authentication {

    public static async authUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token = req.header("Authorization");
            console.log(token);
            
            if (!token) {
                throw new Error("No token, authorization denied");
            }
            token = token!.replace("Bearer ", "");
            if (!SECRET_KEY) {
                throw new Error("SECRET_KEY is not defined");
            }
            const decode = await jwt.verify(token, SECRET_KEY) as TokenPayload;
            req.id = decode.id;
            next();
        } catch (error:any) {
            throw new Error(error)
        }
    }

    public static async authAdmin( req: Request,res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.id;
            const user = await User.findById(userId);
            console.log(user);
            
            if (!user) {
                throw new Error("admin not found");
            }
            if(user.role !== 'admin'){
                throw new Error("Unauthorized access")
            }
            next();
        } catch (error:any) {
            throw new Error(error)
        }
    }

    public static async authViewer( req: Request,res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.id;
            const user = await User.findById(userId);
            console.log(user);
            
            if (!user) {
                throw new Error("Viewer not found");
            }
            if(user.role !== 'viewer'){
                throw new Error("Unauthorized access")
            }
            next();
        } catch (error:any) {
            throw new Error(error)
        }
    }

    public static async authEditor( req: Request,res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.id;
            const user = await User.findById(userId);
            console.log(user);
            
            if (!user) {
                throw new Error("editor not found");
            }
            if(user.role !== 'editor'){
                throw new Error("Unauthorized access")
            }
            next();
        } catch (error:any) {
            throw new Error(error)
        }
    }
    
}

