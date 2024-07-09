import {Component} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HeaderComponent, FooterComponent} from "@users/core/ui/layout";

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "test-monorepo";
}
