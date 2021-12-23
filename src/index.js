const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));

app.post("/upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "File upload failed", code: 200 });
    }
    const reader = require("./services");
    const datos = reader(`src/files/${filename}`);
    return res.json({ message: JSON.stringify(datos), code: 200 });
  });
});
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("Server running successfully on 3000");
});
