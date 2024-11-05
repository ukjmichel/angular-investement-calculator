import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  enteredInitialInvestment = signal('0');
  enteredAnnualINvestment = signal('0');
  enteredExpectedReturn = signal('0');
  enteredDuration = signal('0');

  constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment(),
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualINvestment(),
    });

    this.enteredInitialInvestment.set('0');
    this.enteredDuration.set('0');
    this.enteredExpectedReturn.set('0');
    this.enteredAnnualINvestment.set('0');
  }
}
