import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@shared/models/form';

@Component({
  selector: 'ch-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  imports: [ReactiveFormsModule, CommonModule],
})
export class FormFieldComponent implements OnInit, AfterViewInit {
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

  onBlur(el: FocusEvent) {
    const inputEl = el.target as HTMLInputElement;
    if (inputEl.value.length > 0) {
      inputEl.classList.add('has-content');
    } else {
      inputEl.classList.remove('has-content');
    }
  }

  ngAfterViewInit() {}
}
