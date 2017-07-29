"use strict";

const
  Product = require('mongoose').model('Product');

module.exports.list = function (req, res) {
  Product.find({}, (err, products) => {
    if (err)
      return res.status(500).send(err);

    res.send(products);
  });
};

module.exports.add = function (req, res) {
  Product.create(req.body, err => {
    if (err)
      return res.status(500).send(err);

    res.send({success: true});
  });
};

module.exports.getById = function (req, res) {
  Product.findOne({_id: req.params.id}).exec((err, product) => {
    if (err)
      return res.status(500).send(err);

    res.send(product);
  });
};

module.exports.delete = function (req, res) {
  Product.findOne({_id: req.params.id}).remove().exec((err) => {
    if (err)
      return res.status(500).send(err);

    res.send({ success: true });
  });
};

module.exports.update = function (req, res) {
  Product.findOne({_id: req.body._id}, (err, product) => {
    if (err)
      return res.status(500).send(err);

    // Update or create new
    product = (product) ? Object.assign(product, req.body) : new Product(req.body);

    product.save(err => {
      if (err)
        return res.status(500).send(err);
      res.send({ success: true });
    });
  });
};
