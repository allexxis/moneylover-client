const jwt = require('jsonwebtoken');
const config = require('../config');
const MoneyLover = require('../moneylover');
const debug = process.env.DEBUG === 'true';

/**
 * Login function using email and password
 *
 * @param {string} email - Your account email
 * @param {string} password - Your account password
 * @return {Promise<boolean>} Returns true if login was successfull
 *
 * @example
 *
 *     const success = await login('jonh@doe.com', 'helloworld');
 */
module.exports = async (email, password) => {
   let token;
   token = await MoneyLover.getToken(email, password);
   try {
      const jwtToken = jwt.decode(token);
      const ml = new MoneyLover(token);
      const userInfo = await ml.getUserInfo();
      if (debug) {
         console.log(
            `Logged in as ${userInfo.email} until ${new Date(
               jwtToken.exp * 1000
            )}`
         );
      }
      await config.set('jwtToken', token);
      return true;
   } catch (e) {
      console.error('Login failed', e);
      return false;
   }
};
