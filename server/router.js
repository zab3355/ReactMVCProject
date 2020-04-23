const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    
  //app GETs
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getRecipeItems', mid.requiresLogin, controllers.Recipe.getRecipeItems);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/addRecipe', mid.requiresLogin, controllers.Recipe.makerPage);
  app.get('/remove', mid.requiresLogin, controllers.Recipe.removePage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    
  //app POSTs
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
  app.post('/addRecipe', mid.requiresLogin, controllers.Recipe.make);
  app.post('/remove', mid.requiresLogin, controllers.Recipe.remove);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
};

module.exports = router;