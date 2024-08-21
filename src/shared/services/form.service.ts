import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField } from '../models/form/form-field';

@Injectable()
export class FormService {
  createFormGroup(fields: FormField[]): FormGroup {
    const group: { [key: string]: FormControl } = {};

    fields.forEach((field) => {
      group[field.name] = field.control;
    });

    return new FormGroup(group);
  }
}
