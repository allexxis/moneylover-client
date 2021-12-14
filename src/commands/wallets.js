const { getMoneyLover } = require('../util');
const debug = process.env.DEBUG === 'true';
module.exports.handler = async () => {
   try {
      const ml = await getMoneyLover();
      const wallets = await ml.getWallets();
      if (debug) {
         console.log(wallets);
      }
      return wallets;
   } catch (error) {
      console.error('Error requesting wallets: ', error);
   }
};
