import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersListVM} from "./users-list-vm";
import {UsersVM} from "../../../../users-vm";
import {UsersCardComponent} from "../users-card/users-card.component";

@Component({
  selector: "users-list-ui",
  standalone: true,
  imports: [CommonModule, UsersCardComponent],
  templateUrl: "./users-list.component.html",
  styleUrl: "./users-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input({required: true})
  vm!: UsersListVM;

  @Output() deleteUser = new EventEmitter();

  onDeleteUser(user: UsersVM) {
    this.deleteUser.emit(user);
  }
}
