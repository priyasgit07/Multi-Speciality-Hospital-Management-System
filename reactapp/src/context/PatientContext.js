import React, { createContext, useState } from "react";

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const addPatient = (name, age) => {
    setPatients([
      ...patients,
      {
        id: patients.length + 1,
        name,
        age,
        status: "Available"
      }
    ]);
  };

  const updateRoomStatus = (id, status) => {
    setPatients(
      patients.map(p =>
        p.id === id ? { ...p, status } : p
      )
    );
  };

  return (
    <PatientContext.Provider
      value={{ patients, addPatient, updateRoomStatus }}
    >
      {children}
    </PatientContext.Provider>
  );
};
