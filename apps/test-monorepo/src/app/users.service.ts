import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "./user.interface";

export enum DataTypes {
  users = "users",
  comments = "comments",
  todos = "todos",
  photos = "photos",
}

@Injectable({providedIn: "root"})
export class UsersService {
  private readonly http = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users");
  }

  public getData<T>(type: DataTypes): Observable<T[]> {
    return this.http.get<T[]>(`https://jsonplaceholder.typicode.com/${type}`, {
      params: {
        "_limit": 10
      }
    });
  }
}
