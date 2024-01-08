import { useState } from "react";

const CreateDriverForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    description: "",
    image: "",
    nationality: "",
    dateofbirth: "",
    teamNames: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User created successfully!");
        setFormData({
          name: "",
          lastname: "",
          description: "",
          image: "",
          nationality: "",
          dateofbirth: "",
          teamNames: "",
        });
      } else {
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div>
      <h1>Create Driver</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          LastName:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nationality:
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date Of Birth:
          <input
            type="text"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Teams:
          <input
            type="text"
            name="teamNames"
            value={formData.teamNames}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateDriverForm;
