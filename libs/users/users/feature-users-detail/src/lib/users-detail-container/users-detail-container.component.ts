import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersDetailCardComponent} from "../users-detail-card/users-detail-card.component";
import {Router} from "@angular/router";
import {UsersEntity, UsersFacade} from "@users/data-access";
import {
  CreateUserDTO,
  UsersDTO,
} from "libs/users/users/data-access/src/lib/users-dto.model";
import {map, Observable, tap} from "rxjs";
import {UsersDetailVM} from "../users-detail-vm";
import {LetDirective} from "@ngrx/component";
import {select, Store} from "@ngrx/store";
import {selectQueryParam} from "@ang/data-access";

@Component({
  selector: "users-detail-container",
  standalone: true,
  imports: [CommonModule, UsersDetailCardComponent, LetDirective],
  templateUrl: "./users-detail-container.component.html",
  styleUrl: "./users-detail-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailContainerComponent implements OnInit {
  private readonly usersFacade = inject(UsersFacade);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  public readonly userId!: number;

  @Input({required: true})
  public user!: any;

  public vm!: UsersDetailVM;

  public readonly status$ = this.usersFacade.status$;

  public readonly user$: Observable<UsersEntity | null> =
    this.usersFacade.openedUser$.pipe(
      tap((user) => {
        if (!user) {
          this.usersFacade.loadUser();
        } else {
          this.user = user;
        }
      })
    );

  public readonly editMode$: Observable<boolean> = this.store.pipe(
    select(selectQueryParam("edit")),
    map((params) => params === "true")
  );

  ngOnInit(): void {
    this.usersFacade.getUserFromStore(this.userId);
    console.log("this.vm", this.vm);
  }

  public onEditUser(userData: UsersDTO) {
    this.usersFacade.editUser(userData, this.userId);
    this.router.navigate(["/home"], {
      queryParams: {edit: false},
    });
  }

  onCloseUser() {
    this.router.navigate(["/home"]);
  }
}
