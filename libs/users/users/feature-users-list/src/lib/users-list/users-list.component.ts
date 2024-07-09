import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "users-list-ui",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users-list.component.html",
  styleUrl: "./users-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {}
