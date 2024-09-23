import { FormField, FieldValidationsType } from './form-field';

export class TextField extends FormField {
  constructor(opts: {
    name: string;
    label: string;
    value?: string;
    validations?: FieldValidationsType;
  }) {
    super({
      name: opts.name,
      label: opts.label,
      value: opts.value || '',
      validations: opts.validations || {},
    });
  }
}
