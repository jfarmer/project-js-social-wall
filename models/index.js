'use strict';

let fs = require('fs');
let path = require('path');

function isModelFile(fileName) {
  let baseName = path.basename(module.filename);

  return (fileName.indexOf('.') !== 0) && (fileName !== baseName) && (fileName.slice(-3) === '.js');
}

let models = {};

let modelFileNames = fs.readdirSync(__dirname).filter(isModelFile);

for (let modelFileName of modelFileNames) {
  let model = require(path.join(__dirname, modelFileName));

  models[model.name] = model;
}

module.exports = models;
