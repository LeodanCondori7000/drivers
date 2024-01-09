import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
const USER_EMAIL = "leo@gmail.com";
const USER_PASSWORD = "123qwe";

function AllComponents() {
  const { pathname } = useLocation();
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

  const login = (userData) => {
    if (userData.password === USER_PASSWORD && userData.email === USER_EMAIL) {
      setAccess(true);
      navigate("/home");
    }
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const onSearch = () => { }
  return (
    <div>
      {pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        {/* <Route path="/" element={<Landing />}/> */}
        <Route path="/" element={<Login login={login} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default AllComponents;
