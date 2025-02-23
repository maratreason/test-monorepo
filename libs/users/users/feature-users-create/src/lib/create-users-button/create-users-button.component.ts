import {ChangeDetectionStrategy, Component, DestroyRef, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import {CreateUsersDialogComponent} from "../create-users-dialog/create-users-dialog.component";
import {UsersFacade} from "@users/data-access";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
// import {CreateUserDTO} from "@users/data-access";

@Component({
  selector: "create-users-button",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: "./create-users-button.component.html",
  styleUrl: "./create-users-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersButtonComponent {
  private name!: string;
  private email!: string;
  private username!: string;
  public dialog = inject(MatDialog);
  private readonly usersFacade = inject(UsersFacade);
  private readonly destroyRef = inject(DestroyRef);

  openAddUserDialog(): void {
    const dialogRef: MatDialogRef<CreateUsersDialogComponent> =
      this.dialog.open(CreateUsersDialogComponent, {
        data: {name: this.name, email: this.username},
      });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newUserData: any /*CreateUserDTO*/ = {
            name: result.name,
            email: result.email,
            username: result.username,
          };

          this.usersFacade.addUser(newUserData);
        }
      });
  }
}
