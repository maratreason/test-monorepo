import {inject, Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {tap} from "rxjs";

import {UsersEntity, UsersFacade} from "@users/data-access";
import {DeepReadonly} from "@users/core/utils";
import {UsersVM} from "@users/feature-users-list";
import {usersVMAdapter} from "../users-vm.adapter";
import {UsersDeleteDialogComponent} from "../users-delete-dialog/users-delete-dialog.component";

type UsersListState = DeepReadonly<{
  users: UsersVM[];
}>;

const initialState: UsersListState = {
  users: [],
};

@Injectable()
export class UsersListContainerStore extends ComponentStore<UsersListState> {
  private readonly usersFacade = inject(UsersFacade);
  public readonly users$ = this.select((state) => state.users);
  public readonly status$ = this.usersFacade.status$;
  private readonly dialog = inject(MatDialog);

  // alternate use this.select(multithreads) function:
  /*
  public readonly status$ = this.select( <= the same: public readonly status$ = this.usersFacade.status$;
    this.usersFacade.status$,
    (status) => status
  );
  public readonly status$ = this.select(
    this.usersFacade.status$,
    status => status
  );
  public readonly status$ = this.select(
    this.users$,
    this.usersFacade.status$,
    (users, status) => status
  );
  public readonly status$ = this.select(({users}) => users)
  */

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  public deleteUser(user: UsersVM): void {
    const dialogRef: MatDialogRef<UsersDeleteDialogComponent> =
      this.dialog.open(UsersDeleteDialogComponent, {
        data: {name: user.name},
      });

    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.usersFacade.deleteUser(user.id);
        })
      )
    );
  }

  private setUsersFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.usersFacade.allUsers$.pipe(
        tap((users: UsersEntity[]) => this.patchUsers(users))
      )
    );
  }

  private patchUsers(users: UsersEntity[]): void {
    this.patchState({
      users: users.map((user) => usersVMAdapter.entityToVM(user)),
    });
  }
}
