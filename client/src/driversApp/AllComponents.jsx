import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import CreateDriverForm from "./components/createDriver/CreateDriverForm";
import { searchDrivers } from "./reduxLogic/actions";
import About from "./components/about/About";
import Detail from "./components/detail/Detail";

const USER_EMAIL = "leo@gmail.com";
const USER_PASSWORD = "123qwe";

function AllComponents() {
  const { pathname } = useLocation();
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (userData) => {
    if (userData.password === USER_PASSWORD && userData.email === USER_EMAIL) {
      setAccess(true);
      navigate("/home");
    }
  };

  const populateTeamsTable = () => {
    axios
      .get("http://localhost:3001/teams")
      .then((response) => console.log(response))
      .catch(() => console.log("some error ocurred!"));
  };

  useEffect(()=>{
    populateTeamsTable();
  },[])

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const onSearch = (driver) => {
    if (!driver) {
      return;
    }
    dispatch(searchDrivers(driver));
  };

  return (
    <div>
      {pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        {/* <Route path="/" element={<Landing />}/> */}
        <Route path="/" element={<Login login={login} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/driver" element={<CreateDriverForm />} />
      </Routes>
    </div>
  );
}

export default AllComponents;
