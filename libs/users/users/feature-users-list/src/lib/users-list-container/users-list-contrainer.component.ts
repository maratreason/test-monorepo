import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersListComponent} from "../users-list/users-list.component";

@Component({
  selector: "users-list-container",
  standalone: true,
  imports: [CommonModule, UsersListComponent],
  templateUrl: "./users-list-contrainer.component.html",
  styleUrl: "./users-list-contrainer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListContrainerComponent {}
