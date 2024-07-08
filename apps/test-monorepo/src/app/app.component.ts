import {Component, inject} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {HeaderComponent, FooterComponent} from "@users/core/ui/layout";
import {DataTypes, UsersService} from "./users.service";
import {Todo} from "./todo.interface";
import {User} from "./user.interface";

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe, AsyncPipe, NgIf, HeaderComponent, FooterComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "test-monorepo";
  private readonly usersService = inject(UsersService);

  public readonly users$ = this.usersService.getData<User>(DataTypes.users);
  public readonly todos$ = this.usersService.getData<Todo>(DataTypes.todos);
}
