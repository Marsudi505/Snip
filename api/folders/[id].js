const connectDB = require("../lib/mongodb")
const Folder = require("../../models/Folder")

module.exports = async (req, res) => {

  await connectDB()

  const { id } = req.query

  if (req.method === "DELETE") {

    await Folder.findByIdAndDelete(id)

    return res.json({
      status: true
    })

  }

  res.status(405).end()

}