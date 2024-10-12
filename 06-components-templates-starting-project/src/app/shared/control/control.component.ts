import { afterNextRender, afterRender, Component, contentChild, ContentChild, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') clickFunction = 'onClick()' 

  label = input.required<string>();
  private el = inject(ElementRef);

  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    afterRender(() => {
      console.log('After Render');
    });

    afterNextRender(() => {
      console.log('After Next Render');
    })
  }

  onClick() {
    console.log('Clicked!');
    console.log(this.el);
    console.log(this.control());

  }
}
