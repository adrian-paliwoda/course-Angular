import { Component, EventEmitter, output, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  // standalone: true,
  // imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  // @Output() calculate = new EventEmitter<InvestmentInput>();
  // calculate = output<InvestmentInput>();

  // enteredInitialInvestment = "100";
  // enteredAnnualInvestment = "10";
  // enteredExpectedReturn = "5";
  // enteredDuration = "10";
  enteredInitialInvestment = signal("100");
  enteredAnnualInvestment = signal("10");
  enteredExpectedReturn = signal("5");
  enteredDuration = signal("10");

constructor(private investmentService: InvestmentService){

}
  
  onSubmit() {
    console.log('Submitted');

    if (this.enteredAnnualInvestment() !== ''
      && this.enteredAnnualInvestment() !== ''
      && this.enteredExpectedReturn() !== ''
      && this.enteredDuration() !== ''
      && this.enteredAnnualInvestment() !== '0'
      && this.enteredAnnualInvestment() !== '0'
    ) {
      console.log('Verified');
      
      this.investmentService.calculateInvestmentResults({
        initialInvestment: +this.enteredInitialInvestment(),
        annualInvestment: +this.enteredAnnualInvestment(),
        expectedReturn: +this.enteredExpectedReturn(),
        duration: +this.enteredDuration()
      });

      // this.calculate.emit({
      //   initialInvestment: +this.enteredInitialInvestment(),
      //   annualInvestment: +this.enteredAnnualInvestment(),
      //   expectedReturn: +this.enteredExpectedReturn(),
      //   duration: +this.enteredDuration()
      // });

    } else {
      console.log('Some of value are empty!');

    }

    this.enteredInitialInvestment.set("100");
    this.enteredAnnualInvestment.set("10");
    this.enteredExpectedReturn.set("5");
    this.enteredDuration.set("10");
  }
}
