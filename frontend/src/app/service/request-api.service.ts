import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Request {
  id?: number;
  method: string;
  date: Date;
  returnedData: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
}

export interface Post {
  userId: number;
  title: string;
  body: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class RequestApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getAlbumsByUser(idUser: number): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.baseUrl}/users/${idUser}/albums`);
  }

  createRequest(request: Request): Observable<string> {
    return this.http.post(`${this.baseUrl}/request`, request, {
      responseType: 'text',
    });
  }

  getLogs(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/logs`);
  }

  updateLog(id: number, method: string, data: string): Observable<Request> {
    return this.http.put<Request>(
      `${this.baseUrl}/logs/${id}?method=${method}`,
      data
    );
  }

  deleteLog(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/logs/${id}`, {
      responseType: 'text',
    });
  }

  simulateError(): Observable<string> {
    return this.http.get(`${this.baseUrl}/simulateError`, {
      responseType: 'text',
    });
  }
}
