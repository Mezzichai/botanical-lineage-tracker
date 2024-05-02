const makeQuery = require("./makeQuery")

const isNameUnique = async (table, name, speciesId) => {
  if (name === "") {
    return 
  }

  let GET_BY_NAME;
  if (table === 'species') {
    GET_BY_NAME = `
      SELECT name 
      FROM species
      WHERE name = $1
    `;
  } else {
    GET_BY_NAME = `
      SELECT name 
      FROM $1
      WHERE species_id = $2 AND name = $3
    `;
  }
  
  const result = await makeQuery(GET_BY_NAME, table === 'species' ? [name] : [speciesId, name]);
  
  return !result.rowCount > 0
}