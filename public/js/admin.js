// public/js/admin.js

let folders = []
let snippets = []

document
  .getElementById("addFolderBtn")
  .addEventListener("click", addFolder)

document
  .getElementById("saveBtn")
  .addEventListener("click", saveSnippet)

document
  .getElementById("logoutBtn")
  .addEventListener("click", () => {

    localStorage.removeItem("token")

    location.href = "/admin"

  })

const token =
  localStorage.getItem("token")

if (!token) {
  location.href = "/admin"
}

Promise.all([
  loadFolders(),
  loadSnippets()
])

async function addFolder() {

  const name =
    document.getElementById("folderName").value

  if (!name) {
    return alert("Nama folder kosong")
  }

  await fetch("/api/folders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name
    })
  })

  document.getElementById("folderName").value = ""

  await loadFolders()

}

async function loadFolders() {

  const req =
    await fetch("/api/folders")

  folders =
    await req.json()

  const select =
    document.getElementById("folder")

  const folderList =
    document.getElementById("folderList")

  select.innerHTML =
    `<option value="">Pilih Folder</option>`

  folderList.innerHTML = ""

  folders.forEach(folder => {

    select.innerHTML += `
      <option value="${folder._id}">
        ${folder.name}
      </option>
    `

    folderList.innerHTML += `
      <div class="folder-item">

        <span>${folder.name}</span>

        <button
          class="folder-delete"
          onclick="deleteFolder('${folder._id}')"
        >
          ✕
        </button>

      </div>
    `

  })

}

async function saveSnippet() {

  const title =
    document.getElementById("title").value

  const folderId =
    document.getElementById("folder").value

  const filename =
    document.getElementById("filename").value

  const description =
    document.getElementById("description").value

  const code =
    document.getElementById("code").value

  if (
    !title ||
    !folderId ||
    !filename ||
    !code
  ) {
    return alert("Lengkapi data")
  }

  const data = {
    title,
    folderId,
    filename,
    description,
    code
  }

  if (window.editId) {

    await fetch(
      `/api/snippets/${window.editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(data)
      }
    )

    window.editId = null

  } else {

    await fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(data)
    })

  }

  clearForm()

  await loadSnippets()

}

async function loadSnippets() {

  const req =
    await fetch("/api/snippets")

  snippets =
    await req.json()

  const list =
    document.getElementById("snippetList")

  list.innerHTML = ""

  snippets.forEach(snippet => {

    list.innerHTML += `
      <div class="snippet-item">

        <h3>
          ${snippet.title}
        </h3>

        <p>
          ${snippet.description || "-"}
        </p>

        <div class="actions">

          <button
            class="edit-btn"
            onclick="editSnippet('${snippet._id}')"
          >
            EDIT
          </button>

          <button
            class="delete-btn"
            onclick="deleteSnippet('${snippet._id}')"
          >
            HAPUS
          </button>

        </div>

      </div>
    `

  })

}

window.editSnippet =
async function(_id) {

  const data =
    snippets.find(
      item => item._id === _id
    )

  if (!data) return

  document.getElementById("title").value =
    data.title

  document.getElementById("folder").value =
    data.folderId

  document.getElementById("filename").value =
    data.filename

  document.getElementById("description").value =
    data.description

  document.getElementById("code").value =
    data.code

  window.editId = _id

}

window.deleteSnippet =
async function(_id) {

  const yakin =
    confirm("Hapus snippet ini?")

  if (!yakin) return

  await fetch(
    `/api/snippets/${_id}`,
    {
      method: "DELETE"
    }
  )

  await loadSnippets()

}

window.deleteFolder =
async function(id) {

  const yakin =
    confirm("Hapus folder ini?")

  if (!yakin) return

  await fetch(
    `/api/folders/${id}`,
    {
      method: "DELETE"
    }
  )

  await loadFolders()

}

function clearForm() {

  document.getElementById("title").value = ""

  document.getElementById("folder").value = ""

  document.getElementById("filename").value = ""

  document.getElementById("description").value = ""

  document.getElementById("code").value = ""

}