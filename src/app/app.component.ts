import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { AnnualData, InvestmentInput } from './investment-input.model';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { signal } from '@angular/core'; // Make sure to import signal from Angular

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {
  resultsData = signal<AnnualData[] | undefined>(undefined);

  onCalculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, duration, expectedReturn, annualInvestment } =
      data;
    const annualData: AnnualData[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    // Update the signal with the new data
    this.resultsData.set(annualData); // This line needs to be corrected
    // Instead of set, you might need to use this.resultsData.update(() => annualData);
    //this.resultsData.update(() => annualData); // Use update method to set new value
  }
}
