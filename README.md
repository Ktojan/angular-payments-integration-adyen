# Payment methods integration demos

I'm web-developer Andrey Karpovich 🇺🇦 and this is my demo app for payment methods integration based on adyen API, compiled with Angular 18. 
Payments types included: 
- cards: Visa, Mastercard, American Express, 3D Secure.
- Drop-in
- iDEAL
- SEPA Direct Debit
- ACH
- Klarna - Pay now
- Dotpay

All the accounts are test. Created in December 2024. 

## Installation

1. Clone this repo:

```
git clone https://github.com/adyen-examples/adyen-angular-online-payments.git
```

2. Navigate to `checkout` and install dependencies:

```
npm install
```

3. Navigate to `node-api` and install dependencies:

```
npm install
```

## Usage

1. Start the Express server:
```
$ cd node-api
$ npm start
```
2. Serve the Angular application:
```
$ cd checkout
$ ng serve --proxy-config proxy.conf.json
```
3. Visit [http://localhost:8080/](http://localhost:8080/) to select an integration type.

![payment1](https://github.com/user-attachments/assets/64a8a04c-8d67-4aba-8ac0-d896b7c0148c)

![payment2](https://github.com/user-attachments/assets/c13d21ed-4bd8-492a-8fc1-c0cad94e3e41)

![payment3](https://github.com/user-attachments/assets/44f1d5ec-eaac-49eb-b3ba-7cfc32a8d9f3)

![payment4](https://github.com/user-attachments/assets/e32df1ff-5cc8-49b0-b7be-62536ed7ee1d)





