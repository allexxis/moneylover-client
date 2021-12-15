const { transactions } = require('./src');
const start = async () => {
   // await login('john@doe.com', 'helloworld');
   const transaction = await transactions({
      startDate: '12/01/2021',
      endDate: '12/01/2021',
   });
   console.log(transaction);
};
start();
