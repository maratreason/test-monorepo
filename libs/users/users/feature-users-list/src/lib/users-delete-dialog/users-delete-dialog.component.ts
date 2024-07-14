import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatDialogModule, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: "lib-users-delete-dialog",
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: "./users-delete-dialog.component.html",
  styleUrl: "./users-delete-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDeleteDialogComponent {
  public data: {name: string} = inject(MAT_DIALOG_DATA);
}
