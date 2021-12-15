const { getMoneyLover } = require('../util');
const MoneyLover = require('../moneylover');

/**
 * Income Type
 * @typedef {Object} CategoryOptions
 * @property {string} wallet - The name of the wallet
 * @property {boolean} income  - Set to true if you want to fetch income categories; set true by default
 * @property {boolean} expense  -  Set to true if you want to fetch expense categories; set true by default
 * @property {Date} date  - A note for the transaction
 */
/**
 * Creates an income transaction
 *
 * @param {CategoryOptions} options - The name of the wallet
 * @return {Promise<any>}  Returns transacion if success undefined when error
 *
 * @example
 *
 *     const transaction = await categories({ wallet:"US", income:true, expense:true });
 */
module.exports = async ({ wallet, income = true, expense = true }) => {
   const ml = await getMoneyLover();
   const wallets = await ml.getWalletNames();
   const categories = [];
   fetchCategories = async (wallets) => {
      for (const wallet of wallets) {
         const fetchedCategories = await ml.getCategories(wallet._id);
         categories.push(...fetchedCategories);
         console.log(categories);
      }
   };
   wallet = wallets.find(
      ({ _id, name }) => _id === wallet || name.split(' ').join('') === wallet
   );

   if (wallet == null) {
      console.error('Wallet not found ALL categories will be fetch');
      await fetchCategories(wallets);
   } else {
      const fetchedCategories = await ml.getCategories(wallet._id);
      categories.push(...fetchedCategories);
   }

   let newCategories = [];
   if (income) {
      newCategories = [
         ...categories.filter(
            ({ type }) => type === MoneyLover.CATEGORY_TYPE_INCOME
         ),
      ];
   }
   if (expense) {
      newCategories = [
         ...newCategories,
         ...categories.filter(
            ({ type }) => type === MoneyLover.CATEGORY_TYPE_EXPENSE
         ),
      ];
   }
   return categories;
};
