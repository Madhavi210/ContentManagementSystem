export interface IMedia {
    filename: string;
    path: string;
    mimetype: string;
    size: number;
  }
  
  export interface IContent {
    _id?: string; // Optional if using MongoDB ObjectId
    title: string;
    body: string;
    uploadedBy: string; // Assuming uploadedBy is the User ID as a string
    media?: IMedia;
    createdAt: Date;
    updatedAt: Date;
  }