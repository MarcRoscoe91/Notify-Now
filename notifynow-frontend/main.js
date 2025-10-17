// main.js
const API_BASE = "https://api.notify-now.vercel.app"; // your backend URL

async function getUserData() {
  const res = await fetch(`${API_BASE}/api/user`);
  const data = await res.json();
  console.log(data);
}

document.addEventListener("DOMContentLoaded", () => {
  // example: run when page loads
  getUserData();
});
