const { Team } = require("../db");
const axios = require("axios");

const getTeamsHandler = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/drivers");
    const externalDrivers = response.data;
    let teams = [];
    for (const driver of externalDrivers) {
      if (driver && driver.teams) {
        const arrayOfStrings = driver["teams"]
          .split(",")
          .map((str) => str.trim());
        for (const element of arrayOfStrings) {
          if (!teams.includes(element)) {
            teams.push(element);
          }
        }
      }
    }

     for (const teamName of teams) {
       await Team.findOrCreate({ where: { name: teamName } });
     }

     res.status(200).json({ message: "Teams inserted successfully" });
  } catch (error) {
    console.error("Error fetching or saving teams:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getTeamsHandler,
};
