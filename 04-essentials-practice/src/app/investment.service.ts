import { Injectable, signal } from "@angular/core";
import { InvestmentInput } from "./investment-input.model";
import { InvestmentResults } from "./investment-results.model";

@Injectable({providedIn: 'root'})
export class InvestmentService {
    // resultsData?: InvestmentResults[];
    resultsData = signal<InvestmentResults[] | undefined>(undefined);

    calculateInvestmentResults(data: InvestmentInput) {
        const annualData = [];
        let investmentValue = data.initialInvestment;
    
        for (let i = 0; i < data.duration; i++) {
          const year = i + 1;
          const interestEarnedInYear = investmentValue * (data.expectedReturn / 100);
          investmentValue += interestEarnedInYear + data.annualInvestment;
          const totalInterest =
            investmentValue - data.annualInvestment * year - data.initialInvestment;
          annualData.push({
            year: year,
            interest: interestEarnedInYear,
            valueEndOfYear: investmentValue,
            annualInvestment: data.annualInvestment,
            totalInterest: totalInterest,
            totalAmountInvested: data.initialInvestment + data.annualInvestment * year,
          });
        }
    
        this.resultsData.set(annualData);
        // this.resultsData = annualData;
      }
}