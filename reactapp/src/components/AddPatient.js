import React, { useState, useContext } from "react";
import { PatientContext } from "../context/PatientContext";
import { useHistory } from "react-router-dom";

const AddPatient = () => {
  const { addPatient } = useContext(PatientContext);
  const history = useHistory();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <div>
      <input
        placeholder="Patient Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={e => setAge(e.target.value)}
      />

      <button
        onClick={() => {
          addPatient(name, age);
          history.push("/");
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default AddPatient;
