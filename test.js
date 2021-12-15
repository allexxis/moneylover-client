const { income } = require('./src');
const start = async () => {
   // await login('john@doe.com', 'helloworld');
   const transaction = await income({
      amount: 1000,
      category: 'INCOME',
      date: '12/14/2021',
      wallet: 'CRYPTO STATS',
   });
   console.log(transaction);
};
start();
