const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const picSchema = new Schema({
  title:  String ,
  url: { type: String, required: true },
  caption : String
});

const Pic = mongoose.model("Pic", picSchema);

module.exports = Pic;
