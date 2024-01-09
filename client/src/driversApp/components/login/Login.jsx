import React from "react";
import validation from "./validation";

const Login = ({ login }) => {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  React.useEffect(() => {
    if (userData.email !== "" || userData.password !== "") {
      const userValidated = validation(userData);
      setErrors(userValidated);
    }
  }, [userData]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red", fontSize: "10px" }}>{errors.email}</p>}

      <br />

      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        value={userData.password}
        onChange={handleChange}
      />
      {errors.password && <p style={{ color: "red", fontSize: "10px" }}>{errors.password}</p>}

      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
