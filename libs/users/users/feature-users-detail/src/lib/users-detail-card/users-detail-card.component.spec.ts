import {ComponentFixture, TestBed} from "@angular/core/testing";
import {UsersDetailCardComponent} from "./users-detail-card.component";

describe("UsersDetailCardComponent", () => {
  let component: UsersDetailCardComponent;
  let fixture: ComponentFixture<UsersDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDetailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
