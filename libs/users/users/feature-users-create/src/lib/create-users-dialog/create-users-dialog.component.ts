import {ChangeDetectionStrategy, Component, Inject, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: "lib-create-users-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./create-users-dialog.component.html",
  styleUrl: "./create-users-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  public readonly dialogRef = inject(MatDialogRef<CreateUsersDialogComponent>);

  public formGroup: FormGroup = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    username: ["", Validators.required],
  });

  public data: {name: string; email: string} = inject(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        name: this.formGroup.value.name,
        username: this.formGroup.value.username,
        email: this.formGroup.value.email.trim().toLowerCase(),
      };
      this.dialogRef.close(formData);
    }
  }
}
