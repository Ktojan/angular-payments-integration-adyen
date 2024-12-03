# Payment methods integration demos

I'm Andrey Karpovich 🇺🇦 and this is my demo app for payment methods integration based on adyen API, compiled with Angular 18. 
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

