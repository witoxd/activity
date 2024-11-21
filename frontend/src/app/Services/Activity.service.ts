import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityI } from '../Models/Activity';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/Activity2`
  base_path_service = `${this.api_uri_node}/Activity2`
  constructor(
    private http: HttpClient
  ) { }

  getAllActivity(): Observable<{ Activitys: ActivityI[] }> {
    return this.http
      .get<{ Activitys: ActivityI[] }>(this.base_path)
  }


  getOneActivity(id: number): Observable<{ Activitys: ActivityI[] }> {
    return this.http
      .get<{ Activitys: ActivityI[] }>(`${this.base_path_service}/${id}`)
  }

  createActivity(data: any): Observable<ActivityI> {
    return this.http.post<ActivityI>(this.base_path_service, data)
  }

  updateActivity(id: number, data: any): Observable<ActivityI> {
    return this.http.put<ActivityI>(`${this.base_path_service}/${id}`, data);
  }

  deleteActivity(id: number): Observable<ActivityI> {
    return this.http.delete<ActivityI>(`${this.base_path_service}/${id}`);
  }

}


