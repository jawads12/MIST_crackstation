const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  information : {
    type: String,
    required: true,
  }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
