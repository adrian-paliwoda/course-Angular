import { Component,computed,inject,input, Input } from '@angular/core';
import { InvestmentResults } from '../investment-results.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  // standalone: true,
  // imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // @Input() results? : InvestmentResults[] = [];
  // results = input<InvestmentResults[]>();
  private investmentService = inject(InvestmentService);

  // get results() {
  //   return this.investmentService.resultsData;
  // }
  results = computed(() => this.investmentService.resultsData());
}