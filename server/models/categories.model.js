const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categories = new Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
});

const categoriesSchema = new Schema(
  {
    categories: [categories],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", categoriesSchema);
