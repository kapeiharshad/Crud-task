const userModel = require("../model/userModel");
const express = require("express");
let router = express.Router();

router.post("/", (req, res) => {
  console.log("from save User:::::");
  userModel.saveUser(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
module.exports = router;
