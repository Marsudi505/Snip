// models/Snippet.js

const mongoose = require("mongoose")

module.exports = mongoose.model(
  "Snippet",
  new mongoose.Schema({
    title: String,
    folderId: String,
    filename: String,
    description: String,
    code: String,
    views: {
      type: Number,
      default: 0
    },
    copies: {
      type: Number,
      default: 0
    }
  })
)