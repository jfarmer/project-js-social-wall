'use strict';

let fs = require('fs');
let path = require('path');

// Load the Knex and Objection libraries to talk with the database.
// Knex: http://knexjs.org/
// Objection: https://vincit.github.io/objection.js/
let Knex = require('knex');
let Objection = require('objection');

function isModelFile(fileName) {
  let baseName = path.basename(module.filename);

  return (fileName.indexOf('.') !== 0) && (fileName !== baseName) && (fileName.slice(-3) === '.js');
}

function loadModels(env) {
  let models = {};

  let dbConfig = require(path.join(__dirname, '..', 'config', 'database'));

  let knex = Knex(dbConfig[env]);
  Objection.Model.knex(knex);

  let modelFileNames = fs.readdirSync(__dirname).filter(isModelFile);

  for (let modelFileName of modelFileNames) {
    let model = require(path.join(__dirname, modelFileName));

    models[model.name] = model;
  }

  return models;
}

module.exports = loadModels(process.env.NODE_ENV);
