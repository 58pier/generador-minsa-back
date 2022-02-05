const fs = require("fs");
const pdf = require("pdf-parse");
const reader = async (name) => {
  let dataBuffer = fs.readFileSync(`${name}`);
  const datos = await pdf(dataBuffer).then(function (data) {
    // PDF text
    const textoPlano = data.text.trim();
    let datos = {
      nombres: (/Name\s\n([\s\S]*?)Fecha/.exec(textoPlano)[1].trim()).replace(/\n|\r/g, " "),
      fechaNacimiento: /birth\s\s\n([\s\S]*?)Documento/.exec(textoPlano)[1].trim(),
      dni: /DNI: ([\s\S]*?)\nNacionalidad/.exec(textoPlano)[1].trim(),
      sexo: /Sex  \n([\s\S]*?)Vacuna/.exec(textoPlano)[1].trim(),
      dosis:{
          1:{
              fecha: /Place\n([\s\S]*?)1ª/.exec(textoPlano)[1].trim().replace(/\n|\r/g, " "),
              vacuna: /dosis([\s\S]*?)\w+\n/.exec(textoPlano)[1].trim().replace(/\n|\r/g, " "),
              lugar: /1ª dosis[\s\S]+\)\n?([\s\S]*?)\n?([\d{2}\/])+2ª dosis/.exec(textoPlano)[1].trim() .replace(/\n|\r/g, " "),
          },
          2:{
              fecha: /(\d{2}\/\d{2}\/\d{4})2ª/.exec(textoPlano)[1].trim().replace(/\n|\r/g, " "),
              vacuna: /2ª dosis(.*?)\n\w+/.exec(textoPlano)[1].trim().replace(/\n|\r/g, " "),
              lugar: (/2ª dosis.*?\n([\s\S]*?)(\d|Copyright)/.exec(textoPlano)[1].trim()).replace(/\n|\r/g, " "),
          }
      }
  }
  if(textoPlano.includes('3ª')){
      const dosis=datos.dosis
      datos.dosis= {
          ...dosis,
          3:{
              fecha: /(\d{2}\/\d{2}\/\d{4})3ª/.exec(textoPlano)[1].trim().replace(/\n|\r/g, " "),
              vacuna: /3ª dosis(.*?)\n\w+/.exec(textoPlano)[1].trim().replace(/\n|\r/g, " "),
              lugar: (/3ª dosis.*?\n([\s\S]*?)(\d|Copyright)/.exec(textoPlano)[1].trim()).replace(/\n|\r/g, " "),
          }
      }
  }
    return datos;
  });
  return datos;
};
module.exports = reader;

