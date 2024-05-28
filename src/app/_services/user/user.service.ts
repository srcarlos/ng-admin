import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { IUser } from './user.model';
import IResponseList from 'src/app/_shared/response.interface';

type UserListResponse = IResponseList<IUser>;

@Injectable({ providedIn: 'root' })
export class UserService {
  private _userUrl = '/auth/users';

  constructor(private http: HttpClient) {}

  /*
   * Adds a new user to the backend.
   * @param user The user object to be added.
   * @returns An observable containing the created user or an error.
   */
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this._userUrl, user).pipe(
      map((createdUser) => {
        // Handle successful user creation (e.g., logging, notifications)
        return createdUser;
      }),
      catchError((error) => {
        // Handle user creation error (e.g., logging, user feedback)
        return throwError(error);
      })
    );
  }

  /*
   * Retrieves a specific user from the backend based on their ID.
   * @param userId The ID of the user to retrieve.
   * @returns An observable containing the retrieved user or an error.
   */
  getUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this._userUrl}/${userId}`).pipe(
      map((user) => {
        // Handle successful user retrieval (e.g., caching, logging)
        return user;
      }),
      catchError((error) => {
        // Handle user retrieval error (e.g., logging, user feedback)
        return throwError(error);
      })
    );
  }

  /**
   * Retrieves a list of users from the backend.
   * @returns An observable containing an `IResponseList` with `data` as an array of retrieved users,
   *          or an error if the request fails.
   */
  getUserList(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(this._userUrl).pipe(
      map((response: UserListResponse) => response),
      catchError((error) => {
        // Handle user list retrieval error (e.g., logging, user feedback)
        console.error('Error retrieving user list:', error); // Log the error for debugging
        return throwError(error); // Re-throw the error to propagate it to the caller
      })
    );
  }
  /*
   * Updates an existing user in the backend.
   * @param user The user object containing the updated information.
   * @returns An observable containing the updated user or an error.
   */
  updateUser(user: IUser): Observable<IUser> {
    const userId = user.id; // Assuming 'id' property exists in the IUser interface
    return this.http.put<IUser>(`${this._userUrl}/${userId}`, user).pipe(
      map((updatedUser) => {
        // Handle successful user update (e.g., logging, notifications)
        return updatedUser;
      }),
      catchError((error) => {
        // Handle user update error (e.g., logging, user feedback)
        return throwError(error);
      })
    );
  }

  /*
   * Deletes a user from the backend based on their ID.
   * @param userId The ID of the user to be deleted.
   * @returns An observable containing a success message or an error.
   */
  deleteUser(userId: string): Observable<string> {
    // Return type can be adjusted based on backend response
    return this.http.delete<string>(`${this._userUrl}/${userId}`).pipe(
      map((message) => {
        // Handle successful user deletion (e.g., logging, notifications)
        return message;
      }),
      catchError((error) => {
        // Handle user deletion error (e.g., logging, user feedback)
        return throwError(error);
      })
    );
  }
}
