import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { matchTo } from 'helpers/form-validations';
import { FieldValidationsType } from './form.types';

export class FormField {
  name: string;
  type: string;
  label: string;
  value: string;
  control: FormControl;
  validations: FieldValidationsType;

  constructor(opts: {
    name: string;
    label: string;
    type?: string;
    value: string;
    validations: FieldValidationsType;
  }) {
    this.name = opts.name;
    this.label = opts.label;
    this.type = opts.type || 'text';
    this.value = opts.value;
    this.validations = opts.validations;
    this.control = new FormControl(this.value, [
      ...this.setValidations(this.validations),
    ]);
  }

  private setValidations(validations: FieldValidationsType): ValidatorFn[] {
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
      matchTo: validations.matchTo ? matchTo(validations.matchTo) : false,
    };

    return (Object.keys(validatorMap) as (keyof typeof validatorMap)[])
      .map((k) => validatorMap[k])
      .filter((i) => i) as ValidatorFn[];
  }
}
