import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  ticketInfo = input.required<Ticket>({alias: 'ticketInfo'});
  close = output();
  detailsVisible = signal(false);

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible);
    this.detailsVisible.update((old) => !old);
  }

  onComplete() {
    this.close.emit()
  }
}
