import React, { useContext } from "react";
import { PatientContext } from "../context/PatientContext";
import { useParams, useHistory } from "react-router-dom";

const PatientDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { patients } = useContext(PatientContext);

  const patient = patients.find(p => p.id === Number(id));
  if (!patient) return null;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Age: {patient.age}</p>

      <button onClick={() => history.push(`/room/${patient.id}`)}>
        Update Room Status
      </button>
    </div>
  );
};

export default PatientDetails;
