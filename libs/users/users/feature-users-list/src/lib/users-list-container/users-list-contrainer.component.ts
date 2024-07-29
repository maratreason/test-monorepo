import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersListComponent} from "../users-list/users-list.component";
import {UsersListContainerStore} from "./users-list-container.store";
import {UsersVM} from "../../../../users-vm";
import {LetDirective} from "@ngrx/component";

@Component({
  selector: "users-list-container",
  standalone: true,
  imports: [CommonModule, UsersListComponent, LetDirective],
  templateUrl: "./users-list-contrainer.component.html",
  styleUrl: "./users-list-contrainer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore]
})
export class UsersListContrainerComponent {
  private readonly componentStore = inject(UsersListContainerStore);
  public readonly users$ = this.componentStore.users$;
  public readonly status$ = this.componentStore.status$;

  onDeleteUser(user: UsersVM) {
    this.componentStore.deleteUser(user);
  }
}
