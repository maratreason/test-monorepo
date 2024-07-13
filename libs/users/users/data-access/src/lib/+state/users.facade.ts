import {Injectable, inject} from "@angular/core";
import {select, Store, Action} from "@ngrx/store";

import * as UsersActions from "./users.actions";
import * as UsersFeature from "./users.reducer";
import * as UsersSelectors from "./users.selectors";

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);

  status$ = this.store.pipe(select(UsersSelectors.selectUsersStatus));
  allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));

  init() {
    this.store.dispatch(UsersActions.initUsers());
  }
}
