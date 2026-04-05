import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../../dailybytes-interfaces/user';
import { Router } from '@angular/router';


export interface IUserCred {
  userId: number,
  userName: string,
  emailId: string,
  roleId: number
}

export interface IMembershipResponse {
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(private readonly http: HttpClient) { }

  registerUser(userObj: IUser): Observable<boolean> {
    return this.http.post<boolean>('https://localhost:7195/api/User/RegisterUser', userObj)
      .pipe(catchError(this.errorHandler));
  }

  getAllUsernames(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:7195/api/User/GetAllUsernames')
      .pipe(catchError(this.errorHandler));
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`https://localhost:7195/api/User/GetUserById/${userId}`)
      .pipe(catchError(this.errorHandler));
  }

  updateUserProfile(userObj: IUser): Observable<boolean> {
    return this.http.post<boolean>('https://localhost:7195/api/User/UpdateUserProfile', userObj)
      .pipe(catchError(this.errorHandler));
  }

  loginUser(id: string, password: string): Observable<IUserCred> {
    const loginObj = {
      emailId: id,
      password: password
    }
    return this.http.post<IUserCred>('https://localhost:7195/api/User/ValidateUserCredentials', loginObj)
      .pipe(catchError(this.errorHandler));
  }

  //create a method to call the api for selecting membership type
  selectMembershipType(userId: number, membershipType: string): Observable<IMembershipResponse> {
    const membershipObj = {
      userId: userId,
      membershipName: membershipType  
    }
    return this.http.post<IMembershipResponse>(
      'https://localhost:7195/api/User/SelectMembership',  
      membershipObj
    ).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
