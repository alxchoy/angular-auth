import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormField } from '../models/form/form-field';

@Injectable()
export class FormService {
  constructor(private formBuilder: FormBuilder) {}

  createFormGroup<T extends { [K in keyof T]: FormControl }>(
    fields: FormField[]
  ): FormGroup<T> {
    const group: { [key: string]: FormControl } = {};

    fields.forEach((field) => {
      group[field.name] = field.control;
    });

    return new FormGroup<T>(group as unknown as T);
  }
}
