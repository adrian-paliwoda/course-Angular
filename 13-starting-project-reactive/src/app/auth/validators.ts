import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

export function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true }
}


export function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }

  return of({ notUnique: true });
}

export function equalValues(controlName1: string, controlName2: string) {
return (control: AbstractControl) => {
  const value1 = control.get(controlName1)?.value;
  const value2 = control.get(controlName2)?.value;

  if (value1 === value2) {
    return null;
  }

  return {notEqualValues: true};
}

  
}