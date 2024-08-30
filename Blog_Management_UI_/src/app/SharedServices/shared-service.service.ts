import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private apiurl = "https://localhost:44354/api/BlogPost";
  constructor(private http: HttpClient) { }
  
  getPostsList(): Observable<any> {
    return this.http.get<any>(this.apiurl + "/GetList").pipe(
      catchError(this.handleError));
  }

  createNewPost(data: any): Observable<void> {
    return this.http.post<void>(this.apiurl + "/PostCreateUpdate", JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deletePostItems(id: number): Observable<void> {
    return this.http.post<void>(this.apiurl + "/PostDelete", id, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
