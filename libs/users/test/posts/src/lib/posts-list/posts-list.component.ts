import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostsFacade} from "../../../data-access/src";

@Component({
  selector: "lib-posts-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./posts-list.component.html",
  styleUrl: "./posts-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {
  private readonly postsFacade = inject(PostsFacade);
  public readonly posts$ = this.postsFacade.allPosts$;
}
