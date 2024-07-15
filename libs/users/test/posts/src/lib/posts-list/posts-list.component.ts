import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-posts-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./posts-list.component.html",
  styleUrl: "./posts-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {}
