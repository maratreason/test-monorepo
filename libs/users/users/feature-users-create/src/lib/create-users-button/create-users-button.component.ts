import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-create-users-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./create-users-button.component.html",
  styleUrl: "./create-users-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersButtonComponent {}
