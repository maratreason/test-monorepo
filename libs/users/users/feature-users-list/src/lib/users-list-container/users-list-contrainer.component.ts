import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersListComponent} from "../users-list/users-list.component";
import {UsersFacade} from "@users/data-access";
import {UsersListContainerStore} from "./users-list-container.store";

@Component({
  selector: "users-list-container",
  standalone: true,
  imports: [CommonModule, UsersListComponent],
  templateUrl: "./users-list-contrainer.component.html",
  styleUrl: "./users-list-contrainer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore]
})
export class UsersListContrainerComponent {
  private readonly componentStore$ = inject(UsersListContainerStore);
  public readonly users$ = this.componentStore$.users$;
}
