const connectDB = require("../lib/mongodb")
const Snippet = require("../../models/Snippet")

module.exports = async (req, res) => {

  await connectDB()

  const { id } = req.query

  if (req.method === "PUT") {

    await Snippet.findByIdAndUpdate(
      id,
      req.body
    )

    return res.json({
      status: true
    })

  }

  if (req.method === "DELETE") {

    await Snippet.findByIdAndDelete(id)

    return res.json({
      status: true
    })

  }

  res.status(405).end()

}