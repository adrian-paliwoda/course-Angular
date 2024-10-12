import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);
  private savedLoginName: string = 'saved-login-form';


  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem(this.savedLoginName);
      if (savedForm) {
        const loadedSavedForm = JSON.parse(savedForm);

        setTimeout(() => {
          this.form().controls['email'].setValue(loadedSavedForm.email);
        }, 1)
      }


      const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => {
          window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      })
    });
  }

  onSubmit(form: NgForm) {
    if (form.form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    console.log(email);
    console.log(password);


    form.form.reset();

  }
}
