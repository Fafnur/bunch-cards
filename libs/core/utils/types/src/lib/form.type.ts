import { FormControl, FormGroup } from '@angular/forms';

export type Form<T> = {
  [P in keyof T]: T[P] extends 'object' ? FormGroup<Form<T[P]>> : FormControl<T[P]>;
};
