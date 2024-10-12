import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css'
})
export class DashboardItemComponent {
  // @Input({required: true}) image!: {imageSource: string, imageDescription: string};
  // @Input({required: true}) title! : string;
  image = input.required<{source: string, description: string}>();
  title = input.required<string>();
}
