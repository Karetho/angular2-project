import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { User } from "./user";
import {
  HttpErrorHandler,
  HandleError
} from "../../http-error-handler.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable()
export class UsersService {
  apiUrl = "http://localhost:9000/users"; // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("UsersService");
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(catchError(this.handleError("getUsers", [])));
  }

  /* GET users whose name contains search term */
  searchUser(term: string): Observable<User[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ? { params: new HttpParams().set("name", term) } : {};

    return this.http
      .get<User[]>(this.apiUrl, options)
      .pipe(catchError(this.handleError<User[]>("searchUsers", [])));
  }

  /** GET: get the user from the server */
  getUser(id: number): Observable<User | number> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<User>(url)
      .pipe(catchError(this.handleError("getUser", id)));
  }

  //////// Save methods //////////

  /** POST: add a new user to the database */
  addUser(user: User): Observable<User> {
    console.log(user);
    return this.http
      .post<User>(this.apiUrl, user, httpOptions)
      .pipe(catchError(this.handleError("addUser", user)));
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    console.log(url);
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError("deleteUser")));
  }

  /** PUT: update the user on the server. Returns the updated user upon success. */
  updateUser(user: User): Observable<User> {
    httpOptions.headers = httpOptions.headers.set(
      "Authorization",
      "my-new-auth-token"
    );
    const url = `${this.apiUrl}/${user._id}`;
    console.log(url);

    return this.http
      .put<User>(url, user, httpOptions)
      .pipe(catchError(this.handleError("updateUser", user)));
  }
}
