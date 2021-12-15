const { getMoneyLover } = require('../util');
const MoneyLover = require('../moneylover');

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
