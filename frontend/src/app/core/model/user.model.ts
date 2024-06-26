
export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'editor'| 'viewer';
    token?: string;
  }
  
