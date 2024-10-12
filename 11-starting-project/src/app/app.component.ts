import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');


      subscriber.next({ message: 'New value' });
      timesExecuted++;
    }, 2000);
  });

  constructor() {
    // effect(() => {
    //   console.log('Clicked button ' + this.clickCount() + ' times');

    // });
  }

  ngOnInit(): void {
    this.customInterval$.subscribe({
      next: (value) => {
        console.log(value);
      },
      complete: () => console.log('Completed')
    });

    const subscribe = this.clickCount$.subscribe({
      next: (prevCount) => console.log(prevCount),

    });
    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    })

    // const subsription = interval(1000).pipe(
    //   map((value) => value * 2)

    // ).subscribe({
    //   next: (value) => console.log(value),
    // });

    // this.destroyRef.onDestroy(() => {
    //   subsription.unsubscribe();
    // });
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}
