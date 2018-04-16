# LOGIN:
user: user
password: user

run npm scripts in terminal:
```
npm start
npm run build //build for production
```
 

# Frontend Developer Challenge

The purpose of this challenge is to test your ability to implement a solution given an abstract problem.
We want you to develop a Frontend / UI application which a big bank can easily issue new loans and find out what the value and volume of
outstanding debt are.
Problem:
A big bank needs to keep track of the amount of money loaned and the missed/made payments.
A big bank needs a place to retrieve the volume of outstanding debt at some point in time.
Limitations:
Loans are paid back in monthly installments.

## Rules of the challenge

It should be solved on a weekend (3 days).
The solution should take between 8hr to 12hr.
The project needs to be published on github personal repository.
The solution will be presented in front of the Development Team 1 or 2 days after the presentation.
Tech Stack to be used on the solution (One of them):
React (preferred)
Angular

## Loan

## Main functionalities:

As a user, I will be able to:
List my loans.
Request new Loan.
Pay.
See the balance until a date.
Login

## List my loans

I will access to the APP, with or without a login page. I will be on the main page Loans. I will see a list of loans (my loans).
I will see these information fields.
Id
Amount
Terms
Rate
Date

```
ID Amount Terms Rate Date Actions
1 $1000 12 5% 2017-08-05 02:18Z View | Pay | Balance
2 $1000 12 5% 2017-08-04 02:18Z View | Pay | Balance
```
#### API Data Example

##### {


##### [

##### {

"id": 1,
"amount": 1000,
"term": 12,
"rate": 0.05,
"date": "2017-08-05 02:18Z",
},
{
"id": 2,
"amount": 1000,
"term": 12,
"rate": 0.05,
"date": "2017-08-04 02:18Z",
}
]
}

## Request new Loan:

I will be on the list of loans, and I will see a button to "Request a Loan"
It will be opened a modal box, with theses fields:
amount: loan amount in dollars.
term: number of months that will take until the loan gets paid-off.
rate: interest rate as decimal.
date: when the loan was requested (origination date as an ISO 8601 string).
The user will save it, and the new loan is going to appear on the list of Loans.

#### API Data Example

##### {

"amount": 1000,
"term": 12,
"rate": 0.05,
"date": "2017-08-05 02:18Z",
}

## Pay

I will be on the list of Loans. I will be able to make a click on a link Pay on the right actions sections of the list. A modal box will opened with this
fields:

### Fields:

```
payment:
type of payment: made or missed.
date: payment date.
amount: amount of the payment made or missed in dollars.
```

#### API Data Example (Payment made)

##### {

"payment": "made",
"date": "2017-09-05 02:18Z",
"amount": 85.60,
}

#### API Data Example (Payment missed)

##### {

"payment": "missed",
"date": "2017-09-05 02:18Z",
"amount": 85.60,
}

## See the balance until a date.

I will be on the list of Loans. I will be able to make a click on a link Balance on the right actions sections of the list. I will get the volume of
outstanding debt (i.e., debt yet to be paid) at some point in time.
A modal box will opened with this field exaplained below. I will enter the date, and then it will appear the current balance below.

### Field:

```
date: loan balance until this date (today by default).
```
#### API Data Example:

##### {

"balance": 40
}

## Optional Functionalities

It’s possible to add extra features that add value to the solution, such as:
Login
Simulate loan
Search filters
User profile
Dashboard


