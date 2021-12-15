const chrono = require('chrono-node');
const { getMoneyLover } = require('../util');
const MoneyLover = require('../moneylover');

/**
 * Income Type
 * @typedef {Object} TranactionsOptions
 * @property {string} wallet - The name of the wallet
 * @property {boolean} income  - Set to true if you want to fetch income transactions; set true by default
 * @property {boolean} expense  -  Set to true if you want to fetch expense transactions; set true by default
 * @property {Date} startDate  -  Starting date to filter with format MM/DD/YYYY
 * @property {Date} endDate  -  Ending date to filter with format MM/DD/YYYY
 */
/**
 * Creates an income transaction
 *
 * @param {TranactionsOptions} options - The name of the wallet
 * @return {Promise<any>}  Returns transacion if success undefined when error
 *
 * @example
 *
 *     const transaction = await categories({ wallet:"US", income:true, expense:true });
 */
module.exports = async ({
   wallet,
   startDate,
   endDate,
   income = true,
   expense = true,
}) => {
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
   let newTransactions = [];
   if (income) {
      newTransactions = [
         ...transactions.transactions.filter(
            (t) => t.category.type === MoneyLover.CATEGORY_TYPE_INCOME
         ),
      ];
   }
   if (expense) {
      newTransactions = [
         ...newTransactions,
         ...transactions.transactions.filter(
            (t) => t.category.type === MoneyLover.CATEGORY_TYPE_EXPENSE
         ),
      ];
   } else {
      transactions = transactions.transactions;
   }
   return transactions;
};
