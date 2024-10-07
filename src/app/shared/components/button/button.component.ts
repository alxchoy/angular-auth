import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { RouterLink } from "@angular/router";

export interface Button {
  class?: "primary" | "outline";
  type?: "btn" | "link";
  label: string;
  goTo?: string;
  onAction?: () => void;
}

@Component({
  selector: "ch-button",
  standalone: true,
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  imports: [RouterLink],
})
export class ButtonComponent implements OnInit {
  @Input({ required: true })
  btn!: Button;

  @Input()
  isLoading = false;

  constructor() {
  }

  ngOnInit(): void {
    this.btn = {
      class: this.btn.class || "primary",
      type: this.btn.type || "btn",
      ...this.btn,
    };
  }
}
