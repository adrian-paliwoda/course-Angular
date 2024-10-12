import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { InvestmentResults } from './investment-results.model';
import { InvestmentInput } from './investment-input.model';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // resultsData?: InvestmentResults[];
  resultsData = signal<InvestmentResults[] | undefined>(undefined)


}
