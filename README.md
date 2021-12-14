# Money Lover Client
This is library for [Money Lover][moneylover], based on [(moneylover-cli)](https://github.com/leMaik/moneylover-cli)) the "simplest way to manage personal finances" (according to their website). It has apps for iOS and Android and also a Webapp.

Money Lover Client uses the API underneath that webapp to let you track your expenses from the nodesjs. Because time they don't give access to the actual api just beacuse so this is a work arount

## Installation

```bash
npm i  moneylover-client
```

## Usage
### Authentication

#### Using a MoneyLover account
If you are using a Money Lover account for login, you can log in with the following code.

```javascript
const { login } = require('moneylover-client');
const start = async () => {
   const success = login('jonh@doe.com', 'helloworld');
   console.log(success);
};
start();

```



[moneylover]: https://moneylover.me/