import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@shared/models/form/form-field';

@Component({
  selector: 'ch-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  imports: [ReactiveFormsModule, CommonModule],
})
export class FormFieldComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) field!: FormField;
  isPasswordFieldType = false;

  constructor() {}

  ngOnInit() {
    this.isPasswordFieldType = this.field.type === 'password';
  }

  onTogglePasswordFieldType() {
    this.isPasswordFieldType = !this.isPasswordFieldType;
  }
}
