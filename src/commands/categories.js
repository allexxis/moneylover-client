const { getMoneyLover } = require('../util');
const MoneyLover = require('../moneylover');

module.exports = async ({ wallet, income, expense }) => {
   const ml = await getMoneyLover();
   const wallets = await ml.getWalletNames();
   const wallet = wallets.find(
      ({ _id, name }) => _id === wallet || name.split(' ').join('') === wallet
   );
   if (wallet == null) {
      wallet = 'all';
      console.error('Wallet not found ALL categories will be fetch');
   }
   let categories = await ml.getCategories(wallet._id);
   if (income) {
      categories = categories.filter(
         ({ type }) => type === MoneyLover.CATEGORY_TYPE_INCOME
      );
   } else if (expense) {
      categories = categories.filter(
         ({ type }) => type === MoneyLover.CATEGORY_TYPE_EXPENSE
      );
   }

   return categories;
};
