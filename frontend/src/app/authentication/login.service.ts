import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IUser } from '../core/model/user.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api/user';
  private isAuthenticated: Boolean = false;
  constructor(private http:HttpClient) { }
  private token?:string | null = null;
  private role?:string | null = null;
  private userId? : string | null = null

  login(credentials: {email:string, password:string}): Observable<IUser>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, {headers}).pipe(
      tap((response:any) => {
        console.log("login", response.user);
        
        if(response.user){
          this.token = response.user;
          this.userId = response.user.id;
          this.role = response.user.role;          
          console.log(this.token,":token", this.role,":role", this.userId,":id ",  "user detail");
          localStorage.setItem('token', response.user.token);
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('role', response.user.role);
          this.isAuthenticated = true;
          console.log(this.isAuthenticated,"isauthenticated");
        }
      })
    )
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getHeaders() {
    const token = this.getToken();
    if(token) {
      return{
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
    } else{ 
      return {
        headers: new HttpHeaders()
      };
    }
  }
   
  isLoggedIn(){
    return this.isAuthenticated;
  }

}
