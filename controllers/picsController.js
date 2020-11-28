const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Pic
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Pic
      .findById(req.params.id)
      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Pic
      .create(req.body)
      .then(dbModel => {
        console.log("***********\n"+JSON.stringify(dbModel))
        res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Pic
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Pic
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
