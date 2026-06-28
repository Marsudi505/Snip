const snippetList =
  document.getElementById("snippetList")

const folderList =
  document.getElementById("folderList")

const search =
  document.getElementById("search")

let snippets = []
let folders = []

loadData()

async function loadData() {

  const folderReq =
    await fetch("/api/folders")

  const snippetReq =
    await fetch("/api/snippets")

  folders =
    await folderReq.json()

  snippets =
    await snippetReq.json()

  renderFolders()

  renderSnippets(snippets)

}

function renderFolders() {

  folderList.innerHTML = `
    <button
      onclick="filterFolder('all')"
    >
      SEMUA
    </button>
  `

  folders.forEach(folder => {

    folderList.innerHTML += `
      <button
        onclick="filterFolder('${folder._id}')"
      >
        ${folder.name}
      </button>
    `

  })

}

window.filterFolder =
function(folderId) {

  if (folderId === "all") {
    return renderSnippets(snippets)
  }

  const result =
    snippets.filter(
      item =>
      String(item.folderId) ===
      String(folderId)
    )

  renderSnippets(result)

}

function renderSnippets(data) {

  snippetList.innerHTML = ""

  data.forEach(snippet => {

    const folder =
      folders.find(
        f =>
        String(f._id) ===
        String(snippet.folderId)
      )

    snippetList.innerHTML += `
    <div class="card">

      <div class="card-header">
        <div>
          <h3>${snippet.title}</h3>
          <span>
            ${folder?.name || "-"}
          </span>
        </div>
      </div>

      <p class="description">
        ${snippet.description}
      </p>

      <button
        class="view-btn"
        onclick="toggleCode(this)"
      >
        LIHAT CODE
      </button>

      <div class="code-container">

        <div class="code-header">

          <div class="editor-left">

            <span class="dot red"></span>

            <span class="dot yellow"></span>

            <span class="dot green"></span>

            <span class="file-name">
              ${snippet.filename}
            </span>

          </div>

          <button
            class="copy-btn"
            onclick="copyCode(this)"
          >
            COPY
          </button>

        </div>

        <pre>
<code class="language-javascript">${escapeHtml(snippet.code)}</code>
        </pre>

      </div>

    </div>
    `

  })

  Prism.highlightAll()

}

window.toggleCode =
function(button) {

  const container =
    button.nextElementSibling

  container.classList.toggle("show")

  button.textContent =
    container.classList.contains("show")
    ? "SEMBUNYIKAN CODE"
    : "LIHAT CODE"

}

window.copyCode =
function(button) {

  const code =
    button.parentElement
    .nextElementSibling
    .innerText

  navigator.clipboard.writeText(code)

  const old =
    button.textContent

  button.textContent =
    "COPIED"

  setTimeout(() => {
    button.textContent = old
  }, 1500)

}

search.addEventListener(
  "input",
  () => {

    const keyword =
      search.value.toLowerCase()

    const result =
      snippets.filter(item =>
        item.title
        .toLowerCase()
        .includes(keyword)
      )

    renderSnippets(result)

  }
)

function escapeHtml(text) {

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

}