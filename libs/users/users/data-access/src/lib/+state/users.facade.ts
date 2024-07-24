import {Injectable, inject} from "@angular/core";
import {select, Store, Action} from "@ngrx/store";

import * as UsersActions from "./users.actions";
import * as UsersFeature from "./users.reducer";
import * as UsersSelectors from "./users.selectors";
import {CreateUserDTO} from "../users-dto.model";
import {Observable, of, switchMap} from "rxjs";
import {UsersEntity} from "./users.entity";

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);

  status$ = this.store.pipe(select(UsersSelectors.selectUsersStatus));
  allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));

  public readonly openedUser$ = this.store.select(UsersSelectors.selectOpenedUser);

  public init() {
    this.store.dispatch(UsersActions.initUsers());
  }

  public deleteUser(id: number) {
    this.store.dispatch(UsersActions.deleteUser({id}));
  }

  public addUser(user: CreateUserDTO) {
    this.store.dispatch(UsersActions.addUser({user}));
  }

  public getUserById(id: number) {
    this.store.dispatch(UsersActions.getUserById({id}))
  }

  public editUser(userData: CreateUserDTO, id: number) {
    this.store.dispatch(UsersActions.editUser({userData, id}));
  }

  public getUserFromStore(id: number) {
    return this.store.select(UsersSelectors.selectUserById(id))
      .pipe(
        switchMap((user: UsersEntity | any | undefined): Observable<UsersEntity | null> => {
          if (user) {
            return of(user);
          } else {
            return of(null);
          }
        })
      )
  }

  public loadUser() {
    this.store.dispatch(UsersActions.loadUser());
  }
}
