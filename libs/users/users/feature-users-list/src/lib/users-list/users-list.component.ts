import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersListVM} from "./users-list-vm";

@Component({
  selector: "users-list-ui",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users-list.component.html",
  styleUrl: "./users-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input({required: true})
  vm!: UsersListVM;
}
