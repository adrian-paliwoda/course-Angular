import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent{
  private messagesService = inject(MessagesService);
  messagesRx$ = this.messagesService.messagesRx$;

  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);

  // messages = this.messagesService.allMessages;
  // messages = this.messagesService.allMessages();

  // ngOnInit(): void {
  //   const subscription = this.messagesService.messagesRx$.subscribe((messagesFromRx) => {
  //     this.messages = messagesFromRx;
  //     this.cdRef.markForCheck();
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
