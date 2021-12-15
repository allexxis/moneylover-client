# Money Lover Client
This is library for [Money Lover][moneylover], based on [(moneylover-cli)](https://github.com/leMaik/moneylover-cli)) the "simplest way to manage personal finances" (according to their website). It has apps for iOS and Android and also a Webapp.

Money Lover Client uses the API underneath that webapp to let you track your expenses from the nodesjs. Because time they don't give access to the actual api just beacuse so this is a work arount

## Installation

```bash
npm i  moneylover-client
```

## Usage

### Debug

To activate debug mode you can set environmental variable DEBUG to true this can be set at your run command or the environmental in your own computer.
This will log all request with a message with the data or problem in the request similar to moneylover-cli.d

```
DEBUG=true node index.js 
```

### Notes 

Important **wallet** **param** on all functions should be specified without white spaces, I removed the white spaces to avoid  errors when trying to find wallets in the account.

### Authentication

#### Using a MoneyLover account
If you are using a Money Lover account for login, you can log in with the following code.

Login function is needed before using any of the other functions in the library.

```javascript
const { login } = require('moneylover-client');
const start = async () => {
   const success = login('jonh@doe.com', 'helloworld');
   console.log(success);
};
start();

```

### Wallets

This shows how to request your account wallets.

```javascript
const {  wallets } = require('moneylover-client');
const start = async () => {
   const wallet = await wallets();
   console.log(wallet);
};
start();
```

### Categories

Recommended to pass a **wallet** param otherwise more than 258 categories will be fetch as default.

```javascript
const { categories } = require('moneylover-client');
const start = async () => {
   const cat = await categories({});
   console.log(cat);
};
start();

```

### Transactions

This example shows how to get transactions from all wallets if **wallet** is provided then transactions will be filter by the wallet specified.

```javascript
const { transactions } = require('moneylover-client');
const start = async () => {
   const trans = await transactions({
      startDate: '12/01/2021',
      endDate: '12/01/2021',
   });
   console.log(trans);
};
start();


```

### Create Income

This example shows how to get transactions from all wallets if **wallet** is provided then transactions will be filter by the wallet specified.

```javascript
const { income } = require('moneylover-client');
const start = async () => {
   const transaction = await income({
      amount: 1000,
      category: 'INCOME',
      date: '12/14/2021',
      wallet: 'CHEKINGSUS',
   });
   console.log(transaction);
};
start();


```

### Create Expense

This example shows how to get transactions from all wallets if **wallet** is provided then transactions will be filter by the wallet specified.

```javascript
const { expense } = require('moneylover-client');
const start = async () => {
   const transaction = await expense({
      amount: 1000,
      category: 'EXPENSE',
      date: '12/14/2021',
      wallet: 'CHEKINGSUS',
   });
   console.log(transaction);
};
start();


```



[moneylover]: https://moneylover.me/