const models = require('../models');

const Account = models.Account;

// Renders Login page
const loginPage = (req, res) => {
  res.render('login', {
      csrfToken: req.csrfToken()
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  // Force cast to strings to cover some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }
      
      req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/addRecipe' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
        req.session.account = Account.AccountModel.toAPI(newAccount);
        res.json({ redirect: '/addRecipe' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occured' });
    });
  });
};

//Change password method
const changePassword = (request, response) => {
  const req = request;
  const res = response;

  // creates account
  Account.AccountModel.authenticate(
    req.session.account.username,
    req.body.oldPass,
    // eslint-disable-next-line consistent-return
    (err, doc) => {
      if (err) {
        return res.status(400).json({ err });
      }

      if (!doc) {
        return res.status(400).json({ err: 'invalid credentials' });
      }

      Account.AccountModel.generateHash(req.body.newPass, (salt, hash) => {
        Account.AccountModel.updateOne({ username: req.session.account.username },
          { salt, password: hash }, (error) => {
            if (err) {
              return res.status(400).json({ error });
            }

            return res.json({ message: 'password changed' });
          });
      });
    },
  );
};

const getToken = (request, response) => {
    const req = request;
    const res = response;
    
    const csrfJSON = {
        csrfToken: req.csrfToken(),
    };
    
    res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.changePassword = changePassword;