const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    
  //app GETs
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.get('/remove', mid.requiresLogin, controllers.Domo.removePage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    
  //app POSTs
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.post('/remove', mid.requiresLogin, controllers.Domo.remove);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
};

module.exports = router;