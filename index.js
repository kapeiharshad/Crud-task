const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/curdtask", {useNewUrlParser: true});
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
