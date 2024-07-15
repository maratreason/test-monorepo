import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-create-users-dialog",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./create-users-dialog.component.html",
  styleUrl: "./create-users-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersDialogComponent {}
