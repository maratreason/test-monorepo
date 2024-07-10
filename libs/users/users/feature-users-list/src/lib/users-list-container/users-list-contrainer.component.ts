import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersListComponent} from "../users-list/users-list.component";
import {UsersEntity, UsersFacade} from "@users/data-access";
import {map} from "rxjs";
import {UsersListVM} from "../users-list/users-list-vm";

@Component({
  selector: "users-list-container",
  standalone: true,
  imports: [CommonModule, UsersListComponent],
  templateUrl: "./users-list-contrainer.component.html",
  styleUrl: "./users-list-contrainer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListContrainerComponent {
  private readonly usersFacade = inject(UsersFacade);

  public readonly users$ = this.usersFacade.allUsers$.pipe(
    map<UsersEntity[], UsersListVM>((users) => ({
      users
    }))
  );

  constructor() {
    this.usersFacade.init();
  }
}
