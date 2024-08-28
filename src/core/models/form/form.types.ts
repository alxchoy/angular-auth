import { FormControl } from '@angular/forms';

export type FieldValidationsType = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  matchTo?: FormControl;
};
