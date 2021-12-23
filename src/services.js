const fs = require("fs");
const pdf = require("pdf-parse");
const reader = async (name) => {
  let dataBuffer = fs.readFileSync(`${name}`);
  const datos = await pdf(dataBuffer).then(function (data) {
    // PDF text
    const datos = data.text.trim();
    // console.log(datos);
    return datos;
  });
  return datos;
};
module.exports = reader;
