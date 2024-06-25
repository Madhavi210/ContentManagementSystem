import express from "express";
import ContentController from "../controller/content.controller";
import Authentication from "../middleware/authentication";
import upload from "../utils/fileUpload";

export default class ContentRouter {
    private router: express.Router;
    constructor(){
        this.router = express.Router();
        this.routes();
    }
    private routes(){
        // POST /api/content - Create new content
        // this.router.post('/', Authentication.authUser, ContentController.createContent);
        this.router.post('/',upload.single('file'), ContentController.createContent);

        // GET /api/content/:id - Get content by ID
        this.router.get('/:id', ContentController.getContentById);

        // PUT /api/content/:id - Update content by ID
        this.router.put('/:id',  ContentController.updateContent);

        // DELETE /api/content/:id - Delete content by ID
        this.router.delete('/:id', ContentController.deleteContent);

        // GET /api/content - Get all content
        this.router.get('/', ContentController.getAllContent);

    }
    public getRouter(){
        return this.router;
    }
}