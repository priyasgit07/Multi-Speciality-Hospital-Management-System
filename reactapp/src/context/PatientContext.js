import React, { createContext, useState, useReducer } from "react";

export const HospitalContext = createContext();

const initialState = {
  patients: [
    { id: 1, name: "John Doe", age: 35, phone: "123-456-7890", email: "john@email.com", medicalHistory: "Diabetes" },
    { id: 2, name: "Jane Smith", age: 28, phone: "098-765-4321", email: "jane@email.com", medicalHistory: "Hypertension" }
  ],
  doctors: [
    { id: 1, name: "Dr. Wilson", specialty: "Cardiology", department: "Cardiology", available: true },
    { id: 2, name: "Dr. Brown", specialty: "Neurology", department: "Neurology", available: true },
    { id: 3, name: "Dr. Davis", specialty: "Orthopedics", department: "Orthopedics", available: false }
  ],
  departments: [
    { id: 1, name: "Cardiology", specialties: ["General Cardiology", "Interventional Cardiology"] },
    { id: 2, name: "Neurology", specialties: ["General Neurology", "Pediatric Neurology"] },
    { id: 3, name: "Orthopedics", specialties: ["Joint Replacement", "Sports Medicine"] }
  ],
  appointments: [
    { id: 1, patientId: 1, doctorId: 1, date: "2024-01-15", time: "10:00", status: "Scheduled" },
    { id: 2, patientId: 2, doctorId: 2, date: "2024-01-16", time: "14:00", status: "Completed" }
  ],
  medicalRecords: [
    { id: 1, patientId: 1, doctorId: 1, date: "2024-01-10", diagnosis: "Chest Pain", treatment: "ECG, Blood Test", prescription: "Aspirin 75mg" },
    { id: 2, patientId: 2, doctorId: 2, date: "2024-01-12", diagnosis: "Headache", treatment: "MRI Scan", prescription: "Ibuprofen 400mg" }
  ]
};

const hospitalReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, { ...action.payload, id: Date.now() }] };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, { ...action.payload, id: Date.now() }] };
    case 'UPDATE_APPOINTMENT':
      return { ...state, appointments: state.appointments.map(apt => apt.id === action.payload.id ? { ...apt, ...action.payload } : apt) };
    case 'ADD_MEDICAL_RECORD':
      return { ...state, medicalRecords: [...state.medicalRecords, { ...action.payload, id: Date.now() }] };
    case 'UPDATE_DOCTOR_AVAILABILITY':
      return { ...state, doctors: state.doctors.map(doc => doc.id === action.payload.id ? { ...doc, available: action.payload.available } : doc) };
    default:
      return state;
  }
};

export const HospitalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hospitalReducer, initialState);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentUser, setCurrentUser] = useState({ role: 'admin', name: 'Admin User' });

  const addPatient = (patientData) => {
    dispatch({ type: 'ADD_PATIENT', payload: patientData });
  };

  const scheduleAppointment = (appointmentData) => {
    dispatch({ type: 'ADD_APPOINTMENT', payload: { ...appointmentData, status: 'Scheduled' } });
  };

  const updateAppointment = (appointmentData) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: appointmentData });
  };

  const addMedicalRecord = (recordData) => {
    dispatch({ type: 'ADD_MEDICAL_RECORD', payload: { ...recordData, date: new Date().toISOString().split('T')[0] } });
  };

  const updateDoctorAvailability = (doctorId, available) => {
    dispatch({ type: 'UPDATE_DOCTOR_AVAILABILITY', payload: { id: doctorId, available } });
  };

  return (
    <HospitalContext.Provider value={{
      ...state,
      selectedPatient,
      setSelectedPatient,
      currentUser,
      setCurrentUser,
      addPatient,
      scheduleAppointment,
      updateAppointment,
      addMedicalRecord,
      updateDoctorAvailability
    }}>
      {children}
    </HospitalContext.Provider>
  );
};
