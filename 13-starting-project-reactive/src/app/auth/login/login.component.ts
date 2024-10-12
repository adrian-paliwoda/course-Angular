import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailIsUnique, mustContainQuestionMark } from '../validators';
import { debounceTime } from 'rxjs';

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private savedLoginFormName = 'saved-login-form';
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique]

    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required, mustContainQuestionMark],
    })
  });

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }

  ngOnInit() {
    // const savedForm = window.localStorage.getItem(this.savedLoginFormName);
    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
      
    //   this.form.patchValue({
    //     email: loadedForm.email
    //   });
    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => window.localStorage.setItem(this.savedLoginFormName, JSON.stringify({email: value.email}))
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    if (!this.form.touched || this.emailIsInvalid && this.passwordIsInvalid) {
      return;
    }

    console.log(this.form.value.email);
    console.log(this.form.value.password);
  }
}

