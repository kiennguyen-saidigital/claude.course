const form = document.getElementById("searchForm");
const grid = document.getElementById("grid");
const actions = document.getElementById("actions");
const errorBox = document.getElementById("error");

function renderImages(images) {
  errorBox.style.display = "none";
  grid.innerHTML = images
    .map((img) => `<img src="${img.url}" title="${img.title}" width="140" height="140" style="object-fit:cover" />`)
    .join("");
  actions.style.display = "block";
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
}

async function callApi(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("query").value;
  try {
    const { images } = await callApi("/api/start", { query });
    renderImages(images);
  } catch (err) {
    showError(err.message);
  }
});

document.getElementById("continueBtn").addEventListener("click", async () => {
  try {
    const { images } = await callApi("/api/continue");
    renderImages(images);
  } catch (err) {
    showError(err.message);
  }
});

document.getElementById("stopBtn").addEventListener("click", async () => {
  try {
    await callApi("/api/stop");
  } catch (err) {
    showError(err.message);
  }
  grid.innerHTML = "";
  actions.style.display = "none";
});
