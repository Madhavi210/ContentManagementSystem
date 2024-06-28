
export interface IUser {
    srNo?: number;
    _id?: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'editor'| 'viewer';
    token?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
