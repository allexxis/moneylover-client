module.exports = async () => {
   const config = require('../config');
   if (config.get('jwtToken') != null) {
      try {
         await config.clear();
         console.log('Logged out');
      } catch (e) {
         console.error(e);
      }
   } else {
      console.error('Was not logged in');
   }
};
