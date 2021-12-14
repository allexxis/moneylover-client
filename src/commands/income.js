const chrono = require('chrono-node');
const { getMoneyLover, printTransaction } = require('../util');
const MoneyLover = require('../moneylover');
const debug = process.env.DEBUG === 'true';

/**
 * Income Type
 * @typedef {Object} Income
 * @property {string} wallet - The name of the wallet
 * @property {number} amount  - An ammount using wallet currency
 * @property {string} category  - A category from your apps categories
 * @property {(string|undefined)} note  - A note for the transaction
 * @property {Date} date  - A note for the transaction
 */
/**
 * Creates an income transaction
 *
 * @param {Income} income - The name of the wallet
 * @return {Promise<any>}  Returns transacion if success undefined when error
 *
 * @example
 *
 *     const transaction = await income({ wallet:"US", amount:1000, category:"INCOME", note, date:"MM/DD/YYYY" });
 */
module.exports = async ({ wallet, amount, category, note, date }) => {
   const ml = await getMoneyLover();
   const wallets = await ml.getWalletNames();

   if (amount == null) {
      throw new Error('param amount cant be undefined');
   }

   if (wallet == null) {
      throw new Error('wallet amount cant be undefined');
   }
   console.log(wallets);
   wallet = wallets.find(
      ({ _id, name }) => _id === wallet || name.split(' ').join('') === wallet
   );
   const categories = await ml.getCategories(wallet._id);

   if (category == null) {
      throw new Error('category amount cant be undefined');
   }
   category =
      category != null &&
      categories.find(
         ({ name, type, _id }) =>
            type === MoneyLover.CATEGORY_TYPE_INCOME &&
            (name === category || _id === category)
      );
   if (!category) {
      category = categories.find(
         ({ metadata }) => metadata === 'IS_OTHER_INCOME'
      );
   }

   if (date == null) {
      throw new Error('date amount cant be undefined');
   }

   date = date ? chrono.parseDate(date) : new Date(Date.now());

   if (note == null) {
      note = '';
      //throw new Error('date amount cant be undefined');
   }

   try {
      const transaction = await ml.addTransaction({
         account: wallet._id,
         category: category._id,
         amount: `${amount}`,
         note,
         date,
      });
      if (debug) {
         console.log('✔ Income added');
         printTransaction({
            wallet,
            category,
            amount: amount,
            note,
            date,
         });
      }
      return transaction;
   } catch (e) {
      console.error('Could not add income', e);
      return null;
   }
};
