import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserResponse } from '../models/user.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body: any):  Observable<HttpResponse<UserResponse>> {
    const headers = 
    { 
      'ngrok-skip-browser-warning': environment.ngrok_skip_warning // ignore this line
    }
    return this.http.post<any>(environment.product_api + 'api/auth/signin', body, { headers, observe: 'response' });
  }
  
}
