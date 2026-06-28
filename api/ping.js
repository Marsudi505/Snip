const connectDB = require("./lib/mongodb")
const User = require("../models/User")

module.exports = async (req, res) => {

  await connectDB()

  const users = await User.find()

  res.json(users)

}