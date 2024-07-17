import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "detail-users-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users-detail-card.component.html",
  styleUrl: "./users-detail-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailCardComponent {}
