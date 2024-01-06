import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home';

function AllComponents() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default AllComponents;
