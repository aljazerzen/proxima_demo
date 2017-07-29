"use strict";

const
  path = require('path'),
  productController = require(path.resolve('server/controllers/product'));

module.exports = (app) => {

  // Products
  app.get('/products', productController.list);
  app.post('/product', productController.add);
  app.get('/product/:id', productController.getById);
  app.delete('/product/:id', productController.delete);
  app.put('/product', productController.update);
};
