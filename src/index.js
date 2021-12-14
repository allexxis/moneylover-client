const login = require('./commands/login');
const config = require('./config');
const income = require('./commands/income');
const expense = require('./commands/expense');
const moneylover = require('./moneylover');
const wallets = require('./commands/wallets');
const logout = require('./commands/logout');

module.exports = {
   login,
   config,
   income,
   moneylover,
   expense,
   wallets,
   logout,
};
