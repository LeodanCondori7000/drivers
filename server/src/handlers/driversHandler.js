const { Driver } = require("../db");
const { DriversTeams } = require("../db");
const axios = require("axios");

const getDriversHandler = async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const response = await axios.get(
        `http://localhost:5000/drivers?name.forename=${name}`
      );
      const result = response.data;
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    try {
      // Fetch drivers from the external API (assuming it returns an array of drivers)
      const response = await axios.get("http://localhost:5000/drivers");
      const apiDrivers = response.data;
      const formattedDrivers = [];
      for (let i = 0; i < 24; i++) {
        const tempObj = {};
        tempObj.id = apiDrivers[i]["id"];
        tempObj.name = apiDrivers[i]["name"].forename;
        tempObj.lastname = apiDrivers[i]["name"].surname;
        tempObj.description = apiDrivers[i]["description"];
        tempObj.image = apiDrivers[i]["image"].url;
        tempObj.nationality = apiDrivers[i]["nationality"];
        tempObj.dateofbirth = apiDrivers[i]["dob"];
        formattedDrivers[i] = tempObj;
      }


      // Save the fetched drivers to your local database
      // for (const externalDriver of externalDrivers) {
      //   await Driver.create(externalDriver);
      // }

      // Retrieve all drivers from your database and send them as the response
      // const allDrivers = await Driver.find();
      // res.status(200).json(allDrivers);
      res.status(200).json(formattedDrivers);
    } catch (error) {
      console.error("Error fetching or saving drivers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const getDriverHandler = async (req, res) => {
  const id = req.params.idDriver;

  try {
    // Fetch the driver from the external API based on the provided ID
    const response = await axios.get(`http://localhost:5000/drivers/${id}`);

    // Assuming the external API returns a driver object, you can send it as the response
    const externalDriver = response.data;
    res.status(200).json(externalDriver);
  } catch (error) {
    console.error("Error fetching driver:", error);

    // Handle different types of errors and send an appropriate response
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Driver not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const createDriverHandler = async (req, res) => {
  try {
    // Extract driver information from the request body
    const { name, lastname, description, image, nationality, dateofbirth, teamId } =
      req.body;

    // Create a new driver in the database
    const newDriver = await Driver.create({
      name,
      lastname,
      description,
      image,
      nationality,
      dateofbirth,
    });

    const newDriverId = newDriver.id;
  
    await DriversTeams.create({
      DriverId: newDriverId,
      TeamId: teamId,
    });

    res.status(201).json({ message: "Driver created successfully!"});
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

//http://localhost:5000/drivers
//http://localhost:5000/drivers?name.forename={name}
//http://localhost:5000/drivers/:{id}
