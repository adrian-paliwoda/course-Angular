import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, output, Output, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit, OnInit {
  // @ViewChild('form') private formRef?: ElementRef<HTMLFormElement>;

  // @Output('onAddTicket') add = new EventEmitter<{title:string, text:string}>();
  private formRef = viewChild.required<ElementRef<HTMLFormElement>>('form');
  add = output<{ title: string, text: string }>({alias: 'addTicket'});
  enterdTitle = '';
  enterdText = '';


  // onSubmit(title: string, request: string) {
  onSubmit() {
    // this.add.emit({ title: title, text: request });
    this.add.emit({ title: this.enterdTitle, text: this.enterdText });

    const form = this.formRef()?.nativeElement;

    console.log("Submitted");

    // form?.reset();
    this.enterdText = '';
    this.enterdTitle = '';
  }

  ngOnInit(): void {
    console.log("On Init");
    console.log(this.formRef().nativeElement);
  }

  ngAfterViewInit(): void {
    console.log("After View Init");
    console.log(this.formRef().nativeElement);
  }
}
