import React, { useContext, useState } from "react";
import { PatientContext } from "../context/PatientContext";
import { useParams } from "react-router-dom";

const RoomStatus = () => {
  const { id } = useParams();
  const { patients, updateRoomStatus } = useContext(PatientContext);
  const [status, setStatus] = useState("Available");

  const patient = patients.find(p => p.id === Number(id));
  if (!patient) return null;

return (
  <div>
    
    <h2>{patient.name}</h2>

    <select value={status} onChange={e => setStatus(e.target.value)}>
      <option value="Available">Available</option>
      <option value="Occupied">Occupied</option>
      <option value="Maintenance">Maintenance</option>
    </select>

    <button onClick={() => updateRoomStatus(patient.id, status)}>
      Update Status
    </button>

    <p>Room Status: {patient.status}</p>

    
    <button onClick={() => history.push(`/patient/${patient.id}`)}>
      Back to Patient
    </button>
  </div>
);
};

export default RoomStatus;
