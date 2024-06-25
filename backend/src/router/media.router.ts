// import express from 'express';
// import MediaController from '../controller/media.controller';
// import Authentication from '../middleware/authentication';

// export default class MediaRouter {
//     private router: express.Router;

//     constructor() {
//         this.router = express.Router();
//         this.routes();
//     }

//     private routes() {
//         // POST /api/media - Create new media
//         // this.router.post('/', Authentication.authUser, MediaController.createMedia);
//         this.router.post('/', MediaController.createMedia);

//         // GET /api/media/:id - Get media by ID
//         // this.router.get('/:id', Authentication.authUser, MediaController.getMediaById);
//         this.router.get('/:id', MediaController.getMediaById);

//         // DELETE /api/media/:id - Delete media by ID
//         // this.router.delete('/:id', Authentication.authUser, MediaController.deleteMedia);
//         this.router.delete('/:id',  MediaController.deleteMedia);

//         // PUT /api/media/:id - Update media by ID
//         // this.router.put('/:id', Authentication.authUser, MediaController.updateMedia);
//         this.router.put('/:id', MediaController.updateMedia);

//         // GET /api/media - Get all media (requires admin authentication)
//         // this.router.get('/', Authentication.authUser, Authentication.authAdmin, MediaController.getAllMedia);
//         this.router.get('/', MediaController.getAllMedia);
//     }

//     public getRouter() {
//         return this.router;
//     }
// }
