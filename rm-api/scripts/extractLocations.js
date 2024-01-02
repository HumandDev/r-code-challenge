/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require("axios");
const fs = require("fs");

const fetchLocations = async () => {
  let allLocations = [];
  let url = "https://rickandmortyapi.com/api/location";

  try {
    while (url) {
      const response = await axios.get(url);
      const locations = response.data.results.map(({ id, name, url }) => ({
        id,
        name,
        url,
      }));
      allLocations = allLocations.concat(locations);
      url = response.data.info.next; // URL of the next page
    }

    fs.writeFileSync("locations.json", JSON.stringify(allLocations, null, 2));
    console.log("Locations saved to locations.json");
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

fetchLocations();
