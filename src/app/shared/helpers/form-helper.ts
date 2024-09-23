import {
  AbstractControl,
  FormGroup,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

export const matchTo = (to: FormControl): ValidatorFn => {
  return (control: AbstractControl) =>
    control.value !== to.value ? { matchInvalid: true } : null;
};

export const markAsTouchedFields = (form: FormGroup) => {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    control?.markAsTouched();
  });
};
