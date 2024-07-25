import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-users-detail-container",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users-detail-container.component.html",
  styleUrl: "./users-detail-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailContainerComponent {}
