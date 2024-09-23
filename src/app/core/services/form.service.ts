import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField } from '@shared/models/form';

@Injectable()
export class FormService {
  constructor() {}

  createFormGroup<T extends { [K in keyof T]: FormControl }>(
    fields: FormField[],
  ): FormGroup<T> {
    const group: { [key: string]: FormControl } = {};

    fields.forEach((field) => {
      group[field.name] = field.control;
    });

    return new FormGroup<T>(group as unknown as T);
  }
}
