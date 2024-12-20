import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import AdyenCheckout from '@adyen/adyen-web';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface CardItem {
  System: string;
  CardType: string;
  CardNumber: string;
  Expiry: string;  
}

const ELEMENT_DATA: CardItem[] = [
  {System: 'Mastercard', CardType: 'Commercial Debit', CardNumber: '2222 4000 7000 0005', Expiry: '03/30'},
  {System: 'Mastercard', CardType: 'Credit', CardNumber: '2222 4000 1000 0008', Expiry: '03/30'},
  {System: 'Visa', CardType: 'Classic', CardNumber: '4988 4388 4388 4305', Expiry: '03/30'},
  {System: 'Visa', CardType: 'Debit', CardNumber: '4000 1600 0000 0004', Expiry: '03/30'},
  {System: 'Visa', CardType: 'Commercial Premium Debit', CardNumber: '4988 0800 0000 0000', Expiry: '03/30'},
  {System: 'American Express (Amex)', CardType: 'Note! CVC: 7373', CardNumber: '3700 0000 0000 002', Expiry: '03/30'},
  {System: '3D Secure 2', CardType: 'Bancontact / Visa', CardNumber: '4871 0499 9999 9910', Expiry: '03/30'},
];

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  @ViewChild('hook', { static: true }) hook: ElementRef;

  displayedColumns: string[] = ['System', 'CardType', 'CardNumber', 'Expiry'];
  dataSource = ELEMENT_DATA;

  type: string = '';
  sessionId: string = '';
  redirectResult: string = '';
  clientKey: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.hook = new ElementRef('');
  }

  handleServerResponse(res: any, component: any) {
    if (res.action != null) {
      component.handleAction(res.action);
    } else {
      switch (res.resultCode) {
        case 'Authorised':
          this.router.navigate(['/result/success']);
          break;
        case 'Pending':
        case 'Received':
          this.router.navigate(['/result/pending']);
          break;
        case 'Refused':
          this.router.navigate(['/result/failed']);
          break;
        default:
          this.router.navigate(['/result/error']);
          break;
      }
    }
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.queryParamMap.get('type') || '';
    this.sessionId = this.route.snapshot.queryParamMap.get('sessionId') || '';
    this.redirectResult = this.route.snapshot.queryParamMap.get('redirectResult') || '';

    // obtain ADYEN_CLIENT_KEY
    this.http
      .get<any>('/api/config', {observe: 'response'})
      .subscribe(resp => {
        this.clientKey = resp.body.api_key;
    });


    if (!this.sessionId) {

      this.apiService.sessions().subscribe(
        (async res => {

            // Create AdyenCheckout using Sessions response
            const checkout = await this.createAdyenCheckout(res)

            await checkout.create(this.type).mount(this.hook.nativeElement);
        }),
        (async error => {
          console.log('Error is: ', error);
        })
      );
    }
    else {
      // existing session: complete Checkout
      this.finalizeCheckout();
    }

  }

  async createAdyenCheckout(session: any) {

      const configuration = {
          clientKey: this.clientKey,
          locale: "en_US",
          environment: "test",  // change to live for production
          showPayButton: true,
          session: session,
          paymentMethodsConfiguration: {
              ideal: {
                  showImage: true
              },
              card: {
                  hasHolderCardType: true,
                  holderCardTypeRequired: true,
                  CardType: "Credit or debit card",
                  amount: {
                      value: 1000,
                      currency: "EUR"
                  }
              },
              paypal: {
                  amount: {
                      currency: "USD",
                      value: 1000
                  },
                  environment: "test",
                  countryCode: "US"   // Only needed for test. This will be automatically retrieved when you are in production.
              }
          },
          onPaymentCompleted: (state: any, component: any) => {
              this.handleServerResponse(state, component);
          },
          onError: (error: any, component: any) => {
              console.error(error.CardType, error.message, error.stack, component);
          }
      };

      return await AdyenCheckout(configuration);
  }

  // Some payment methods use redirects. This is where we finalize the operation
  async finalizeCheckout() {
    try {
        // Create AdyenCheckout re-using existing Session
        const checkout = await this.createAdyenCheckout({id: this.sessionId});

        // Submit the extracted redirectResult (to trigger onPaymentCompleted() handler)
        checkout.submitDetails({details: this.redirectResult});
    } catch (error) {
        console.error(error);
        alert("Error occurred. Look at console for details");
    }
  }

}
