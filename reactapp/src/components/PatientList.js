import React, { useContext } from "react";
import { PatientContext } from "../context/PatientContext";
import { useHistory } from "react-router-dom";

const PatientList = () => {
  const { patients } = useContext(PatientContext);
  const history = useHistory();

  return (
    <div>
      {patients.map(p => (
        <div key={p.id}>
          <button onClick={() => history.push(`/patient/${p.id}`)}>
            {p.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
