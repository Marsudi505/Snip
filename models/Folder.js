// models/Folder.js

const mongoose = require("mongoose")

module.exports = mongoose.model(
  "Folder",
  new mongoose.Schema({
    name: String
  })
)