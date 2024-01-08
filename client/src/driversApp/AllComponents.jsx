import { Routes, Route } from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import CreateDriverForm from "./components/createDriver/CreateDriverForm";

function AllComponents() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/driver" element={<CreateDriverForm />} />
      </Routes>
    </div>
  )
}

export default AllComponents;
