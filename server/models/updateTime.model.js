const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const updateTime = new Schema({
  startAt: {
    type: String,
    required: true,
  },
  endAt: {
    type: String,
    required: true,
  },
  spentTime: {
    type: String,
    required: true,
  },
  nextTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UpdateTime", updateTime);