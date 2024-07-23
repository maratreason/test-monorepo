import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {UsersEntity, UsersFacade} from "@users/data-access";
import {Observable, tap} from "rxjs";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateUserDTO} from "libs/users/users/data-access/src/lib/users-dto.model";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: "detail-users-card",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: "./users-detail-card.component.html",
  styleUrl: "./users-detail-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailCardComponent {
  private readonly router = inject(Router);
  private readonly usersFacade = inject(UsersFacade);

  public readonly loadingStatus$ = this.usersFacade.status$;

  // @Input({ required: true })
  // public readonly currentUser$: Observable<UsersEntity | null> = this.usersFacade.openedUser$.pipe(
  //   tap(user => {
  //     if (!user) {
  //       this.usersFacade.loadUser();
  //     }
  //   })
  // );
  public userId!: number;
  public user!: any;

  @Input() editMode: boolean = true;

  // @Output() editUser = new EventEmitter<UsersEntity>();
  @Output() closeUser = new EventEmitter();

  public formGroup!: FormGroup;
  private formBuilder!: FormBuilder;

  ngOnInit(): void {
    this.usersFacade.getUserFromStore(this.userId)
    console.log(this.user)

    this.formBuilder = new FormBuilder();
    this.formGroup = this.formBuilder.group({
      name: new FormControl({ value: this.user?.name, disabled: !this.editMode }, [Validators.required]),
      email: new FormControl({ value: this.user?.email, disabled: !this.editMode }, [Validators.required, Validators.email]),
      username: new FormControl({ value: this.user?.username, disabled: !this.editMode }),
      city: new FormControl({ value: this.user?.city, disabled: !this.editMode }),
    });
    this.formGroup.patchValue({
      name: this.user?.name,
      email: this.user?.email,
      username: this.user?.username,
      city: this.user?.city
    });
  }

  submit(): void {
    this.onEditUser(this.formGroup.value)
    // this.editUser.emit(this.formGroup.value)
  }

  onCloseUser() {
    this.closeUser.emit();
  }

  public onEditUser(userData: CreateUserDTO) {
    this.usersFacade.editUser(userData, this.user?.id || 0);
    this.router.navigate(["/home"]);
  }
}
