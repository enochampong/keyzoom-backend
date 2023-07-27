const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const store = require("../models/Store.model");
const request = require("../models/request.model");

router.post("/request", (req, res, next) => {
  const { firstName, lastName, streetName, houseNumber, postCode, city } = req.body;

  Request.create({ firstName, lastName, streetName, houseNumber, postCode, city })
    .then((response) => {
      console.log("request created", response)
      res.json(response)
    })
    .catch((err) => res.json(err));
});

router.get("/:userId/requests", (req, res, next) => {
  console.log("this route works")
  const userId = req.params

  console.log("the id", userId)

  Request.find()
    .then((userRequests) => res.json(userRequests))
    .catch((err) => res.status(500).json({ error: "Unable to retrieve stores." }));
});










module.exports = router;
