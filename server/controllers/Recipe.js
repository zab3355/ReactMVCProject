const models = require('../models');

const { Recipe } = models;

//page render for app
const makerPage = (req, res) => {
  Recipe.RecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.render('app', {
      csrfToken: req.csrfToken(),
      recipeData: docs,
    });
  });
};

//Adds Recipe to the database
const makeRecipe = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'Please fill out each field before continuing.',
    });
  }
 
  const recipeData = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    taste: req.body.taste,
    owner: req.session.account._id,
  };

    
  const newRecipe = new Recipe.RecipeModel(recipeData);

  const recipePromise = newRecipe.save();

  recipePromise.then(() => res.json({
    redirect: 'maker',
  }));

  recipePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Recipe already exists.',
      });
    }

    return res.status(400).json({
      error: 'An error occurred',
    });
  });

  return recipePromise;
};

// added a remove page to delete a recipe
const removePage = (req, res) => {
  Recipe.RecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('remove', { csrfToken: req.csrfToken(), recipes: docs });
  });
};


//getting recipeItems
const getRecipeItems = (request, response) => {
  const req = request;
  const res = response;

  return Recipe.RecipeModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ recipes: docs });
  });
};


//remove recipe section
const removeRecipe = (request, response) => {
  const req = request;
  const res = response;

  return Recipe.RecipeModel.removeById(req.body._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ recipes: docs });
  });
};

//about section
const about = () => {

};

//module exports
module.exports.makerPage = makerPage;
module.exports.getRecipeItems = getRecipeItems;
module.exports.make = makeRecipe;
module.exports.removePage = removePage;
module.exports.remove = removeRecipe;
module.exports.about = about;
