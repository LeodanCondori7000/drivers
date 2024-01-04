const { Driver, Team } = require("../db");
const { DriversTeams } = require("../db");
const axios = require("axios");

const getDriversHandler = async (req, res) => {
  const { name } = req.query;

  try {
    let apiDrivers;
    let allApiDrivers;
    let allDrivers;
    if (name) {
      localDrivers = await Driver.findAll({
        where: { name: name },
        include: Team,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        nest: true,
      });
      const response = await axios.get(
        `http://localhost:5000/drivers?name.forename=${name}`
      );
      apiDrivers = response.data;
      const formattedDrivers = apiDrivers.map((apiDriver) => ({
        id: apiDriver.id,
        name: apiDriver.name.forename,
        lastname: apiDriver.name.surname,
        description: apiDriver.description,
        image: apiDriver.image.url,
        nationality: apiDriver.nationality,
        dateofbirth: apiDriver.dob,
      }));
      allDrivers = [...localDrivers, ...formattedDrivers];
      if (allDrivers.length === 0) {
        res.status(404).json({
          msg: "Driver not found in the local database or external API",
        });
      } else {
        res.status(200).json(allDrivers);
      }
    } else {
      const response = await axios.get("http://localhost:5000/drivers");
      allApiDrivers = response.data;
      const formattedDrivers = allApiDrivers.slice(0, 24).map((apiDriver) => ({
        id: apiDriver.id,
        name: apiDriver.name.forename,
        lastname: apiDriver.name.surname,
        description: apiDriver.description,
        image: apiDriver.image.url,
        nationality: apiDriver.nationality,
        dateofbirth: apiDriver.dob,
      }));

      res.status(200).json(formattedDrivers);
    }
  } catch (error) {
    console.error("Error fetching or saving drivers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// this is the one that works
// const getDriverHandler = async (req, res) => {
//   const id = req.params.idDriver;

//   try {
//     let driver;
//     let driverObject;
//     let teams = [];
//     let teamsStr = "";

//     if (!isNaN(id)) {
//       const response = await axios.get(`http://localhost:5000/drivers/${id}`);
//       const tempDriver = response.data;
//       const idDriver = tempDriver.id;
//       const name = tempDriver.name.forename;
//       const lastname = tempDriver.name.surname;
//       const description = tempDriver.description;
//       const image = tempDriver.image.url;
//       const nationality = tempDriver.nationality;
//       const dob = tempDriver.dob;
//       const teams = tempDriver.teams;
//       driver = {
//         id: idDriver,
//         name,
//         lastname,
//         description,
//         image,
//         nationality,
//         dob,
//         teams,
//       };
//       return res.status(200).json(driver);
//     } else {
//       driver = await Driver.findByPk(id);
//       const driverId = driver.id;

//       const allTable = await DriversTeams.findAll({
//         where: { DriverId: driverId },
//       });

//       teams = await Promise.all(
//         allTable.map(async (item) => {
//           return (await Team.findByPk(item.TeamId)).name;
//         })
//       );

//       teamsStr = teams.join(", ");

//       if (!driver) {
//         res.status(404).json({ error: "Driver not found" });
//         return;
//       }
//       driverObject = driver.get({ plain: true });

//       driverObject["teams"] = teamsStr;
//     }

//     res.status(200).json(driverObject);
//   } catch (error) {
//     console.error("Error fetching driver:", error);

//     if (error.response && error.response.status === 404) {
//       res.status(404).json({ error: "Driver not found" });
//     } else {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// };

// this one is an alternative version to the previous one, but it does not work completely
const getDriverHandler = async (req, res) => {
  const id = req.params.idDriver;

  try {
    let driver;

    if (!isNaN(id)) {
      const response = await axios.get(`http://localhost:5000/drivers/${id}`);
      const tempDriver = response.data;
      const idDriver = tempDriver.id;
      const name = tempDriver.name.forename;
      const lastname = tempDriver.name.surname;
      const description = tempDriver.description;
      const image = tempDriver.image.url;
      const nationality = tempDriver.nationality;
      const dob = tempDriver.dob;
      const teams = tempDriver.teams;
      driver = {
        id: idDriver,
        name,
        lastname,
        description,
        image,
        nationality,
        dob,
        teams,
      };
    } else {
      driver = await Driver.findByPk(id, {
        include: Team,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        nest: true,
      });

      if (!driver) {
        res.status(404).json({ error: "Driver not found" });
        return;
      }
    }
    if (driver.Teams) {
      driver.Teams = driver.Teams.map((team) => ({
        id: team.id,
        name: team.name,
      }));
    }

    res.status(200).json(driver);
  } catch (error) {
    console.error("Error fetching driver:", error);

    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Driver not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const createDriverHandler = async (req, res) => {
  try {
    const {
      name,
      lastname,
      description,
      image,
      nationality,
      dateofbirth,
      teams,
    } = req.body;

    const newDriver = await Driver.create({
      name,
      lastname,
      description,
      image,
      nationality,
      dateofbirth,
    });
    const teamsArr = teams.split(",");
    // my version
    // const driverId = newDriver.id;
    // const idTeams = await Promise.all(
    //   teamsArr.map(async (team) => {
    //     const foundTeam = await Team.findOne({ where: { name: team } });
    //     return foundTeam ? foundTeam.id : null;
    //   })
    // );

    // await Promise.all(
    //   idTeams.map(async (id)=>{
    //     await DriversTeams.create({
    //       TeamId:id,
    //       DriverId: driverId
    //     })
    //   })
    // );

    // sequelized version
    await Promise.all(
      teamsArr.map(async (team) => {
        await newDriver.addTeam(
          (
            await Team.findOne({ where: { name: team } })
          ).id
        );
      })
    );

    res.status(201).json({ message: "Driver created successfully!" });
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getDriversHandler,
  getDriverHandler,
  createDriverHandler,
};
