import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {UsersVM} from "../../../../users-vm";
import {RouterLink} from "@angular/router";

@Component({
  selector: "users-card",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: "./users-card.component.html",
  styleUrl: "./users-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCardComponent {
  @Input({required: true})
  user!: UsersVM;

  @Output() deleteUser = new EventEmitter();

  onDeleteUser() {
    this.deleteUser.emit();
  }
}
