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

router.get("/:userId", (req, res) => {
  userModel.getOneUser(req.params, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.put("/", (req, res) => {
  userModel.updateAllUser(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.put("/:userId", (req, res) => {
  userModel.updateOneUser(req.params, req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
module.exports = router;
