const jwt = require('jsonwebtoken');
const MoneyLover = require('./moneylover');
const config = require('./config');

async function hasValidToken() {
   let jwtToken = await config.get('jwtToken');
   if (!jwtToken) {
      return false;
   }

   jwtToken = jwt.decode(jwtToken);
   return jwtToken.exp * 1000 > Date.now();
}

async function getMoneyLover() {
   if (!(await hasValidToken())) {
      console.error('Token has expired');
      return undefined;
   }

   return new MoneyLover(await config.get('jwtToken'));
}

function printTransaction(transaction) {
   console.log(`Category: ${transaction.category.name}`);
   console.log(
      `Amount:   ${Object.keys(transaction.wallet.balance[0])[0]} ${
         transaction.amount
      }`
   );
   console.log(`Note:     ${transaction.note}`);
   console.log(`Date:     ${transaction.date.toLocaleDateString()}`);
   console.log(`Wallet:   ${transaction.wallet.name}`);
}

module.exports = {
   getMoneyLover,
   printTransaction,
};
