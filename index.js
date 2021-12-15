const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/halo", (req, res) => {
  res.send("Halo semua semuanya!");
});

app.get("/json", (req, res) => {
  res.json({ pesan: "Mengirim Format JSON" });
});

app.post("/login", (req, res) => {
  res.status(201).json({ method: "POST", message: "Berhasil login" });
});

app.delete("/account", (req, res) => {
  res
    .status(200)
    .json({ method: "DELETE", message: "Berhasil menghapus akun" });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

console.log("");
// git config --global credential.helper store
