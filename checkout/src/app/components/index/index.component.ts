import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-index',
  styleUrl: './index.component.scss',
  templateUrl: './index.component.html',
})
export class IndexComponent {
  type: any;
  step = signal(-1);
  selectedMethod = signal('');

  cartItems = [
    { label: 'Zacs Alter Ego Ninja Toy Kit', price: 1.7, img: 'ninja-kit.jpg'},
    { label: 'Inflatable Evergreen Alien', price: 1.25, img: 'alien.jpg'},
    { label: 'Otamatone Deluxe White Japanese Musical Instrument', price: 6.55, img: 'musical_pipe.jpg'},
    { label: 'Toilet Paper Roll With Random Face', price: 0.5, img: 'trump.jpg'},
  ]

  payMethods = [
    { method: 'card', title: 'Card', header: 'Visa, Mastercard, American Express, 3D Secure', description: 'Understanding the pros and cons of each type of credit card can help you find the best one for you.'},
    { method: 'dropin', title: 'Drop-in', header: 'Reduced friction, Multi-factor fraud system, ', description: 'The Drop-In payment solution is a fast and secure way to accept payments online without the need for extensive front-end development work. With just a single embedded iframe you can automatically display and accept payment methods from around the world.'},
    { method: 'ideal', title: 'iDEAL', header: 'it is just ideal', description: 'iDEAL is an online payment method that allows consumers to pay via their own bank. Not only web shops but also other companies offer iDEAL. iDEAL is increasingly used for paying energy bills, donations to charities, topping up call credits, payment requests, paying municipal taxes, traffic fines, etc...'},
    { method: 'sepadirectdebit', title: 'SEPA Direct Debit', header: 'SDD Core, SDD B2B', description: 'SEPA Direct Debits (SDD) have many advantages for consumers: by automating the transaction, consumers avoid the risk of missing a payment deadline, being charged additional fees for late payments, and suffering from an interruption of service.'},
    { method: 'ach', title: 'ACH', header: 'Automated Clearing House Network', description: 'An ACH transfer is an electronic, bank-to-bank money transfer processed through the Automated Clearing House (ACH) Network. The ACH network is a batch processing system that banks and other financial institutions use to aggregate these transactions for processing.'},
    { method: 'klarna_paynow', title: 'Klarna - Pay now', header: 'EUR, GBP,PLN or CHF', description: 'With Klarna Pay Now (Sofort) your customers can transfer money directly from their bank account to yours. When Pay Now (Sofort) is selected in the payment window, the customer then selects their own bank. The customer is then directed to their own banks flow, where they confirm the payment and the money is transferred.'},
    { method: 'dotpay', title: 'Dotpay', header: 'more than 30 Polish banks', description: 'Dotpay is a popular e-payment platform available in Poland. It allows customers to pay with credit cards, e-transfers as well as cash and mobile payments. '},
    { disabled: true, method: 'Paypal', title: 'PayPal', header: 'Soon be available...', description: 'Soon be available...'},
    { disabled: true, method: 'Wise', title: 'Wise', header: 'Soon be available...', description: 'Soon be available...'},
    { disabled: true, method: 'ebanking_FI', title: 'Electronic Bank Transfer', header: 'Soon be available...', description: ''},
  ]
  
  constructor() {}

  setStep(index: number) {
    this.step.set(index);
  }

  setMethod(method: string) {
    if (method) this.selectedMethod.set(method);
  }

  setActive(i: number, method: string, disabled = false) {
    if (disabled) return;
    this.setStep(i); this.setMethod(method)
  }

  refreshStep(i: number) {
    if(this.step()===i) {
      this.setStep(-1);
      this.selectedMethod.set('')
    }
  }

}

