import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = ' http://localhost:3000/api/user'
  constructor(private http:HttpClient) { }

  getUsers(): Observable<{user:IUser[] , totaluser:number}> {
    return this.http.get<{user:IUser[], totaluser:number}>(this.apiUrl)
  }

  getUserById(id:string): Observable<IUser>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<IUser>(`${this.apiUrl}/${id}`, {headers})
  }

  createUser(user: IUser): Observable<IUser> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<IUser>(`${this.apiUrl}`, user, {headers})
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/user/${id}`);
  }
}
