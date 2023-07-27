const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Store = require("../models/Store.model");
const { isAuthenticated } = require("../middleware/jwt.middleware")

router.post("/stores", (req, res, next) => {
  const { firstName, lastName, streetName, houseNumber, postCode, city, description, user, userAnswer } = req.body;
  Store.create({ firstName, lastName, streetName, houseNumber, postCode, city, description, user, userAnswer })
    .then((response) => {
      console.log("store created", response)
      res.json(response)
    })
    .catch((err) => res.json(err));
});


router.get("/:userId/stores", (req, res, next) => {
  console.log("this route works")
  const userId = req.params

  console.log("the id", userId)

  Store.find()
    .then((userStores) => res.json(userStores))
    .catch((err) => res.status(500).json({ error: "Unable to retrieve stores." }));
});


router.get("/stores/:storeid", (req, res, next) => {
  const { storeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  // if (email === '' || password === '' || name === '') {
  //   res.status(400).json({ message: "Provide email, password and name" });
  //   return;
  // }

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // if (!emailRegex.test(email)) {
  //   res.status(400).json({ message: 'Provide a valid email address.' });
  //   return;
  // }

  // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (!passwordRegex.test(password)) {
  //   res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
  //   return;
  // }


  // User.findOne({ email })
  //   .then((foundUser) => {
  //     if (foundUser) {
  //       res.status(400).json({ message: "User already exists." });
  //       return;
  //     }

  //     const salt = bcrypt.genSaltSync(saltRounds);
  //     const hashedPassword = bcrypt.hashSync(password, salt);

  //     return User.create({ email, password: hashedPassword, name });
  //   })
  //   .then((createdUser) => {
  //     const { email, name, _id } = createdUser;

  //     const user = { email, name, _id };

  //     res.status(201).json({ user: user });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ message: "Internal Server Error" })
  //   });

  Store.findById({ storeId })
    .populate("")
    .then((store) => res.status(200).json(store))
    .catch((error) => res.json(error));
});

router.put("/stores/:storeid", (req, res, next) => {
  const { storeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Store.findByIdAndUpdate(storeId, req.body, { new: true })
    .then((updatedStore) => res.json(updatedStore))
    .catch((error) => res.json(error));
});

router.delete("/stores/:storeid", (req, res, next) => {
  const { storeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Store.findByIdAndRemove(storeId)
    .then(() => res.json({ message: `Store Info with ${storeId} is removed successfully, Thank you for doing business with us!!.` }))
    .catch((error) => res.json(error));
});

module.exports = router;
