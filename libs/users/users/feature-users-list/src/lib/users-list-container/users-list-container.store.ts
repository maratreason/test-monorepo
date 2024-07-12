import {inject, Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {UsersEntity, UsersFacade} from "@users/data-access";
import {DeepReadonly} from "@users/core/utils";
import {UsersVM} from "@users/feature-users-list";
import {tap} from "rxjs";
import {usersVMAdapter} from "../users-vm.adapter";

type UsersListState = DeepReadonly<{
  users: UsersVM[];
}>;

const initialState: UsersListState = {
  users: [],
};

@Injectable()
export class UsersListContainerStore extends ComponentStore<UsersListState> {
  private readonly usersFacade = inject(UsersFacade);
  public readonly users$ = this.select(state => state.users);
  // private readonly status$ = this.usersFacade.status$;

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
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
