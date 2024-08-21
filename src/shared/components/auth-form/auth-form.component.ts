import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../models/form/form-field';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'auth-form',
  standalone: true,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent],
  providers: [FormService],
})
export class AuthFormComponent {
  @Input({ required: true }) fields!: FormField[];
  @Output() formValueEvent = new EventEmitter();
  form!: FormGroup;
  isSubmited = false;
  isPasswordFieldType = true;

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.form = this.formService.createFormGroup(this.fields);
    console.log(this.form);
  }

  onTogglePasswordFieldType() {
    this.isPasswordFieldType = !this.isPasswordFieldType;
  }

  onSubmit() {
    this.isSubmited = true;
    this.form.valid && this.formValueEvent.emit(this.form.value);
  }
}
