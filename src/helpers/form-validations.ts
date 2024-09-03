import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export const matchTo = (to: FormControl): ValidatorFn => {
  return (control: AbstractControl) =>
    control.value !== to.value ? { matchInvalid: true } : null;
};
