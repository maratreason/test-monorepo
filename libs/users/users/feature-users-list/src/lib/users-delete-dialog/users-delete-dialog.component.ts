import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-users-delete-dialog",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users-delete-dialog.component.html",
  styleUrl: "./users-delete-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDeleteDialogComponent {}
