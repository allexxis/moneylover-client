const { income, wallets, transactions, login, logout } = require('./src');
const start = async () => {
   // const transaction = await income({
   //    wallet: 'CRYPTOSTATS',
   //    amount: 1000,
   //    category: 'INCOME',
   //    note: undefined,
   //    date: '12/13/2021',
   // });
   // console.log(transaction);
   const historical = await transactions({
      startDate: '12/1/2021',
      endDate: '12/15/2021',
      expense: true,
      income: true,
   });
   console.log(historical);
};
start();
