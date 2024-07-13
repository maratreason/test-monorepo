import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-users-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users-card.component.html",
  styleUrl: "./users-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCardComponent {}
