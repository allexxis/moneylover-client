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
This will log all request with a message with the data or problem in the request similar to moneylover-cli

```
DEBUG=true node index.js 
```



### Authentication

#### Using a MoneyLover account
If you are using a Money Lover account for login, you can log in with the following code.

Login function is needed before using any of the other functions in the library

```javascript
const { login } = require('moneylover-client');
const start = async () => {
   const success = login('jonh@doe.com', 'helloworld');
   console.log(success);
};
start();

```

### Wallets

This shows how to request your account wallets

```javascript
const {  wallets } = require('moneylover-client');
const start = async () => {
   const wallet = await wallets();
   console.log(wallet);
};
start();
```

### Categories

Recommended to pass a **wallet** param otherwise more than 258 categories will be fetch as default

```javascript
const { categories } = require('moneylover-client');
const start = async () => {
   const cat = await categories({});
   console.log(cat);
};
start();

```

### Transactions

This example shows how to get transactions from all wallets if **wallet** is provided then transactions will be filter by the wallet specified

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



[moneylover]: https://moneylover.me/