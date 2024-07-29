import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {UsersEntity, UsersFacade} from "@users/data-access";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {CreateUserDTO} from "libs/users/users/data-access/src/lib/users-dto.model";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {UsersDetailVM} from "../users-detail-vm";

@Component({
  selector: "detail-users-card",
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./users-detail-card.component.html",
  styleUrl: "./users-detail-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailCardComponent {
  public formGroup!: FormGroup;

  private _vm: UsersDetailVM = {editMode: false, user: null, status: "init"};
  get vm() {
    return this._vm;
  }

  @Input({required: true})
  set vm(vm: UsersDetailVM) {
    this._vm = vm;
    if(!this.formGroup) {
      this.formGroup = new FormBuilder().group({
        name: new FormControl(
          {value: vm.user?.name, disabled: !vm.editMode},
          [Validators.required]
        ),
        email: new FormControl(
          {value: vm.user?.email, disabled: !vm.editMode},
          [Validators.required, Validators.email]
        ),
        username: new FormControl({
          value: vm.user?.username,
          disabled: !vm.editMode,
        }),
        city: new FormControl({
          value: vm.user?.city,
          disabled: !vm.editMode,
        }),
      });
    }

    if (vm.user) {
      this.formGroup.patchValue({
        name: vm.user.name,
        email: vm.user.email,
        username: vm.user.username,
        city: vm.user.city,
      });
    }

    if (vm.editMode) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }
  }

  @Output() editUser = new EventEmitter();
  @Output() closeUser = new EventEmitter();
  @Output() userData = new EventEmitter<UsersEntity>();

  private readonly router = inject(Router);
  private readonly usersFacade = inject(UsersFacade);
  public readonly userId!: number;

  submit(): void {
    this.onEditUser(this.formGroup.value);
    this.editUser.emit({
      name: this.formGroup.value.name || "",
      username: this.formGroup.value.username || "",
      city: this.formGroup.value.city || "",
      email: this.formGroup.value.email || "",
    });
  }

  onCloseUser() {
    this.closeUser.emit();
  }

  public onEditUser(userData: CreateUserDTO) {
    this.usersFacade.editUser(userData, this.vm.user?.id || 0);
    this.router.navigate(["/home"]);
  }

  public onOpenEditMode() {

  }

  public onDeleteUser() {

  }
}
