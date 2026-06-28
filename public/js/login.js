// public/js/login.js

async function login() {

  const username =
    document.getElementById("username").value

  const password =
    document.getElementById("password").value

  if (!username || !password) {
    return alert("Isi semua field")
  }

  const req = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })

  const data = await req.json()

  if (!data.status) {
    return alert(data.message)
  }

  localStorage.setItem(
    "token",
    data.token
  )

  location.href =
    "/admin/dashboard.html"

}

document
.getElementById("loginBtn")
.addEventListener("click", login)