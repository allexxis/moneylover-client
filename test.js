const { categories, login } = require('./src');
const start = async () => {
   // await login('john@doe.com', 'helloworld');
   // const transaction = await income({
   //    wallet: 'CRYPTOSTATS',
   //    amount: 1000,
   //    category: 'INCOME',
   //    note: undefined,
   //    date: '12/13/2021',
   // });
   // console.log(transaction);
   const cat = await categories({});
   console.log(cat);
};
start();
