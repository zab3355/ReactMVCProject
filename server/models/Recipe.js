module.exports.Account = require('./Account.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let RecipeModel = {};

// mongoose.Types.ObjectId is a function
//  It converts a string ID to be a real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    defualt: Date.now,
  },
});

RecipeSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

RecipeSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId)
  };
  
  return RecipeModel.find(search).select('name age').lean().exec(callback);
};

RecipeSchema.statics.removeById = (recipeId, callback) => {
  const search = {
    _id: convertId(recipeId),
  };

  return RecipeModel.remove(search).exec(callback);
};

RecipeModel = mongoose.model('Recipe', RecipeSchema);

module.exports.RecipeModel = RecipeModel;
module.exports.RecipeSchema = RecipeSchema;