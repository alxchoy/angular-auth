import { FormGroup } from '@angular/forms';

export const markAsDirtyFields = (form: FormGroup) => {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    control?.markAsDirty();
  });
};
