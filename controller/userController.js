const userModel = require("../model/userModel");
const express = require("express");
let router = express.Router();

router.post("/", (req, res) => {
  userModel.saveUser(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/", (req, res) => {
  userModel.getAllUser((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
module.exports = router;
