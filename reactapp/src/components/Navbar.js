import React from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Multi-Speciality Hospital Management System</h1>

      {/* THESE TWO TEXTS ARE REQUIRED BY TESTS */}
      <button onClick={() => history.push("/")}>
        Patient List
      </button>

      <button onClick={() => history.push("/add")}>
        Add Patient
      </button>
    </div>
  );
};

export default Navbar;
