const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {

  const { username, password } = req.body || {}

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {

    const token = jwt.sign(
      { admin: true },
      process.env.JWT_SECRET
    )

    return res.json({
      status: true,
      token
    })

  }

  res.json({
    status: false,
    message: "Username atau Password salah"
  })

}