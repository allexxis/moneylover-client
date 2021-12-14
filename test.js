const { income, wallets } = require('./src');
const start = async () => {
   // const transaction = await income({
   //    wallet: 'CRYPTOSTATS',
   //    amount: 1000,
   //    category: 'INCOME',
   //    note: undefined,
   //    date: '12/13/2021',
   // });
   // console.log(transaction);
   const wallet = await wallets();
   console.log(wallet);
};
start();
