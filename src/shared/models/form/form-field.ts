import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ValidationTypeMap } from './types';

export class FormField {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  value: string;
  control: FormControl;
  validations: ValidationTypeMap;

  constructor(opts: {
    name: string;
    placeholder: string;
    label: string;
    type?: string;
    value: string;
    validations: ValidationTypeMap;
  }) {
    this.name = opts.name;
    this.placeholder = opts.placeholder;
    this.label = opts.label;
    this.type = opts.type || 'text';
    this.value = opts.value;
    this.validations = opts.validations;
    this.control = new FormControl(this.value, [
      ...this.setValidations(this.validations),
    ]);
  }

  private setValidations(validations: ValidationTypeMap): ValidatorFn[] {
    if (Object.keys(validations).length == 0 || validations == undefined) {
      return [];
    }

    const validatorMap = {
      required: validations.required ? Validators.required : false,
      email: validations.email ? Validators.email : false,
      minLength: validations.minLength
        ? Validators.minLength(validations.minLength)
        : false,
      maxLength: validations.maxLength
        ? Validators.maxLength(validations.maxLength)
        : false,
    };

    return (Object.keys(validatorMap) as (keyof typeof validatorMap)[])
      .map((k) => validatorMap[k])
      .filter((i) => i) as ValidatorFn[];
  }
}
