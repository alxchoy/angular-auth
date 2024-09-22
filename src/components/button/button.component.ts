import { Component, Input, OnInit } from '@angular/core';
import { Button } from './button.interface';

@Component({
  selector: 'ch-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input({ required: true }) btn!: Button;

  constructor() {}

  ngOnInit(): void {
    this.btn = {
      class: this.btn.class || 'primary',
      type: this.btn.type || 'btn',
      ...this.btn,
    };
  }
}
