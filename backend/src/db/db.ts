import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config";

export default class Database {
  constructor() {
    this.connect();
  }
  private async connect() {
    try {
      if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
      }
      await mongoose.connect(MONGODB_URI);
      console.log("connected to mongodb");
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
