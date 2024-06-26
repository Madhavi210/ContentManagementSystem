import express from "express";
import UserController from "../controller/user.controller";
import Authentication from "../middleware/authentication";

export default class UserRouter {
    private router: express.Router;
    constructor(){
        this.router = express.Router();
        this.routes();
    }

    private routes(){
        // POST /api/users - Create a new user
        this.router.post("/", UserController.createUser);

        // GET /api/users/:id - Get user by ID
        this.router.get("/:id", Authentication.authUser, UserController.getUserById);

        // DELETE /api/users/:id - Delete user by ID
        this.router.delete("/:id", Authentication.authUser, Authentication.authAdmin, UserController.deleteUser);

        // PUT /api/users/:id - Update user by ID
        this.router.put("/:id", Authentication.authUser, UserController.updateUser);

        // GET /api/users - Get all users (requires admin authentication)
        // this.router.get("/", Authentication.authUser, Authentication.authAdmin, UserController.getAllUsers);
        this.router.get("/", UserController.getAllUsers);

        // POST /api/users/login - User login
        this.router.post("/login", UserController.login);
    }

    public getRouter(){
        return this.router;
    }
}
