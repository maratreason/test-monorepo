import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {AsyncPipe, CommonModule, JsonPipe, NgIf} from "@angular/common";
import {ApiService} from "@users/core/http";

@Component({
  selector: "users-home",
  standalone: true,
  imports: [CommonModule, JsonPipe, AsyncPipe, NgIf],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly apiService = inject(ApiService);

  public readonly users$ = this.apiService.get("/users");
}
