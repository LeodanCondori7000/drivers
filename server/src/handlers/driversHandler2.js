// "When teamId is sent as a number

const createDriverHandler = async (req, res) => {
  try {
    const {
      name,
      lastname,
      description,
      image,
      nationality,
      dateofbirth,
      teamId,
      // teamId2,
    } = req.body;

    const newDriver = await Driver.create({
      name,
      lastname,
      description,
      image,
      nationality,
      dateofbirth,
    });

    // const newDriverId = newDriver.id;
    // await DriversTeams.create({
    //   DriverId: newDriverId,
    //   TeamId: teamId,
    // });
    await newDriver.addTeam(teamId);
    // await newDriver.addTeam(teamId2);

    res.status(201).json({ message: "Driver created successfully!" });
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//
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