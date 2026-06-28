const connectDB = require("../lib/mongodb")
const Folder = require("../../models/Folder")

module.exports = async (req, res) => {

  await connectDB()

  if (req.method === "GET") {

    const folders =
await Folder.find().lean()

    return res.json(folders)

  }

  if (req.method === "POST") {

    const folder =
      await Folder.create({
        name: req.body.name
      })

    return res.json(folder)

  }

  res.status(405).end()

}