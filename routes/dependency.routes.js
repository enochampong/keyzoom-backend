const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Dependency = require("../models/Dependency.model");
const store = require("../models/Store.model");

router.post("/dependencies", (req, res, next) => {
  const { name, description, storeId } = req.body;

  Dependency.create({ name, description, store: storeId })
    .then((newDependency) => {
      return store.findByIdAndUpdate(storeId, {
        $push: { dependencies: newDependency._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/dependencies/:dependencyId", (req, res, next) => {
  const { dependencyId } = req.params;

  Dependency.findById(dependencyId)
    .then((Dependency) => res.json(Dependency))
    .catch((error) => res.json(error));
});

router.put("/dependencies/:dependencyId", (req, res, next) => {
  const { dependencyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(dependencyId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Dependency.findByIdAndUpdate(dependencyId, req.body, { new: true })
    .then((updatedDependency) => res.json(updatedDependency))
    .catch((err) => res.json(err));
});

router.delete("/dependencies/:dependencyId", (req, res, next) => {
  const { dependencyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(dependencyId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Dependency.findByIdAndRemove(dependencyId)
    .then(() =>
      res.json({ message: `Dependency with info ${dependencyId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
