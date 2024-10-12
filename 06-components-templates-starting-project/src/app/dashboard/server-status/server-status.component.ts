import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private destroyRef = inject(DestroyRef);
  // private interval?: ReturnType<typeof setInterval>;

  constructor(){
    effect(() => {
      console.log(this.currentStatus);    
    });
  }

  ngOnInit(): void {
    // this.interval = setInterval(() => {
    const interval = setInterval(() => {
      const random = Math.random();

      if (random < 0.5) {
        this.currentStatus.set('online');
      } else if (random < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {clearTimeout(interval)});
  }

  // ngOnDestroy(): void {
  //   clearTimeout(this.interval);
  // }
}
