const chrono = require('chrono-node');
const { getMoneyLover } = require('../util');
const MoneyLover = require('../moneylover');
module.exports = async ({ wallet, startDate, endDate, income, expense }) => {
   const ml = await getMoneyLover();
   const wallets = await ml.getWalletNames();
   let walletId = 'all';
   if (wallet) {
      let wallet = wallets.find(
         ({ _id, name }) => _id === wallet || name === wallet
      );
      if (wallet == null) {
         console.error('Wallet not found will use default ALL instead');
      } else {
         walletId = wallet._id;
      }
   }

   let transactions = await ml.getTransactions(
      walletId,
      chrono.parseDate(startDate),
      chrono.parseDate(endDate)
   );
   if (income) {
      transactions = transactions.transactions.filter(
         (t) => t.category.type === MoneyLover.CATEGORY_TYPE_INCOME
      );
   } else if (expense) {
      transactions = transactions.transactions.filter(
         (t) => t.category.type === MoneyLover.CATEGORY_TYPE_EXPENSE
      );
   } else {
      transactions = transactions.transactions;
   }
   return transactions;
};
