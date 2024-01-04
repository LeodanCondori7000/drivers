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
      const tempDriver = await Driver.findByPk(id, {
        include: Team,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        nest: true,
      });

      driver = {
        id: tempDriver.id,
        name: tempDriver.name,
        lastname: tempDriver.lastname,
        description: tempDriver.description,
        image: tempDriver.image,
        nationality: tempDriver.nationality,
        dateofbirth: tempDriver.dateofbirth,
        teams: Teams.map((team) => team.name).join(", "),
      };

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
