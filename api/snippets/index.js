const connectDB = require("../lib/mongodb")
const Snippet = require("../../models/Snippet")

module.exports = async (req, res) => {

  await connectDB()

  if (req.method === "GET") {

    const snippets =
await Snippet.find()
.sort({ _id:-1 })
.lean()

    return res.json(snippets)

  }

  if (req.method === "POST") {

    const snippet =
      await Snippet.create(req.body)

    return res.json(snippet)

  }

  res.status(405).end()

}