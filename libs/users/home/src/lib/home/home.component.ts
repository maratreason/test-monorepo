import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AsyncPipe, CommonModule, JsonPipe, NgIf} from "@angular/common";
import {UsersListContrainerComponent} from "@users/feature-users-list";

@Component({
  selector: "users-home",
  standalone: true,
  imports: [CommonModule, JsonPipe, AsyncPipe, NgIf, UsersListContrainerComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
