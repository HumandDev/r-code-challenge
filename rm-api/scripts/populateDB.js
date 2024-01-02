/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 5432,
});

async function fetchCharacters(page = 1) {
  try {
    let added = 0;
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const characters = response.data.results;

    for (let char of characters) {
      const {
        id,
        name,
        status,
        species,
        type,
        gender,
        origin,
        location,
        image,
        episode,
        url,
        created,
      } = char;
      const sql = `
      INSERT INTO character (
          id, name, status, species, type, gender, 
          origin, location, image, episode, url, created
      ) 
      VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      )
  `;

      const client = await pool.connect();
      await client.query(sql, [
        id,
        name,
        status,
        species,
        type,
        gender,
        JSON.stringify(origin),
        JSON.stringify(location),
        image,
        JSON.stringify(episode),
        url,
        created,
      ]);
      client.release();
      added += characters.length;
    }

    if (response.data.info.next) {
      await fetchCharacters(page + 1);
    } else {
      console.log(`${added} characters fetched and stored in database`);
      pool.end();
    }
  } catch (error) {
    console.error(error);
  }
}

fetchCharacters();
