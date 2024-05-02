const envConfig = require('../config/envConfig');
const { Pool } = require("pg");


const getNextId = async (req, res, next) =>  {
  const pool = new Pool({
    connectionString: envConfig.DATABASE_URL
  })
  
  if (!req.params?.speciesId) {
    const client = await pool.connect()
    const speciesIdResult = await client.query('SELECT nextval(\'species_id_seq\') AS next_id');
    req.params.speciesId = speciesIdResult.rows[0].next_id;
    client.release();
    await pool.end()
  }
  next()
}

module.exports = getNextId