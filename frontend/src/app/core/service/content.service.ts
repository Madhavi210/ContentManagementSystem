import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IUser } from '../model/user.model';
import { IContent } from '../model/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = ' http://localhost:3000/api/content'
  constructor(private http:HttpClient) { }

  getContent(): Observable<{content:IContent[], totalCount:number}> {
    return this.http.get<{content:IContent[], totalCount:number}>(this.apiUrl)
  }

  // Create content
  createContent(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error creating content:', error);
          throw error;
        })
      );
  }

  // Update content (not implemented in this example)
  updateContent(contentId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${contentId}`, formData)
      .pipe(
        catchError((error) => {
          console.error(`Error updating content with ID ${contentId}:`, error);
          throw error;
        })
      );
  }

  // Delete content (not implemented in this example)
  deleteContent(contentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${contentId}`)
      .pipe(
        catchError((error) => {
          console.error(`Error deleting content with ID ${contentId}:`, error);
          throw error;
        })
      );
  }
  
}
