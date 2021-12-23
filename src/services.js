function reader(name) {
  const fs = require("fs");
  const pdf = require("pdf-parse");

  let dataBuffer = fs.readFileSync(`${name}`);

  pdf(dataBuffer).then(function (data) {
    // PDF text
    return data.text;
  });
}
module.exports = reader;
