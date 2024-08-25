import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { FormField } from '../../models/form/form-field';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'ch-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent],
  providers: [FormService],
})
export class FormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) fields!: FormField[];
  @Output() onSubmitEvent = new EventEmitter();
  isPasswordFieldType = true;

  constructor(private formService: FormService) {}

  ngOnInit() {}

  onTogglePasswordFieldType() {
    this.isPasswordFieldType = !this.isPasswordFieldType;
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      this.markAsDirtyFields(this.form);
      return;
    }

    this.onSubmitEvent.emit(this.form.value);
  }

  private markAsDirtyFields(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      control?.markAsDirty();
    });
  }
}
