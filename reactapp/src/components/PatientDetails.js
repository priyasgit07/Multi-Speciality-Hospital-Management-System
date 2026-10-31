import React, { useContext } from "react";
import { HospitalContext } from "../context/PatientContext";
import { useParams, useHistory } from "react-router-dom";

const PatientDetails = () => {
  const { patients, medicalRecords, doctors, appointments } = useContext(HospitalContext);
  const { id } = useParams();
  const history = useHistory();

  const patient = patients.find(p => p.id === parseInt(id));
  const patientRecords = medicalRecords.filter(record => record.patientId === parseInt(id));
  const patientAppointments = appointments.filter(apt => apt.patientId === parseInt(id));

  if (!patient) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Patient Not Found</h2>
        <button onClick={() => history.push("/")} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
          Back to Patient List
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Patient Profile</h2>
        <button onClick={() => history.push("/")} style={{ padding: "8px 15px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px" }}>
          Back to List
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <h3 style={{ marginTop: "0", color: "#007bff" }}>Personal Information</h3>
          <div style={{ lineHeight: "1.8" }}>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age} years</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            {patient.medicalHistory && (
              <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#e7f3ff", borderRadius: "4px" }}>
                <strong>Medical History:</strong><br/>
                {patient.medicalHistory}
              </div>
            )}
          </div>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <h3 style={{ marginTop: "0", color: "#28a745" }}>Appointments Summary</h3>
          <p><strong>Total Appointments:</strong> {patientAppointments.length}</p>
          <p><strong>Completed:</strong> {patientAppointments.filter(apt => apt.status === "Completed").length}</p>
          <p><strong>Scheduled:</strong> {patientAppointments.filter(apt => apt.status === "Scheduled").length}</p>

          <h4>Recent Appointments:</h4>
          {patientAppointments.slice(-3).map(apt => {
            const doctor = doctors.find(d => d.id === apt.doctorId);
            return (
              <div key={apt.id} style={{ padding: "8px", border: "1px solid #ddd", margin: "5px 0", borderRadius: "3px", backgroundColor: "white" }}>
                <strong>{doctor?.name}</strong><br/>
                <small>{apt.date} at {apt.time} - {apt.status}</small>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
        <h3 style={{ marginTop: "0", color: "#dc3545" }}>Complete Medical History</h3>
        {patientRecords.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>No medical records found for this patient.</p>
        ) : (
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {patientRecords.map(record => {
              const doctor = doctors.find(d => d.id === record.doctorId);
              return (
                <div key={record.id} style={{
                  border: "1px solid #eee",
                  padding: "15px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  backgroundColor: "#fafafa"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <strong style={{ color: "#007bff" }}>Visit Date: {record.date}</strong>
                    <span style={{ color: "#666" }}>{doctor?.name} ({doctor?.department})</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div>
                      <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                      <p><strong>Treatment:</strong> {record.treatment}</p>
                    </div>
                    <div>
                      {record.prescription && (
                        <div style={{ backgroundColor: "#e7f3ff", padding: "8px", borderRadius: "3px" }}>
                          <strong>Prescription:</strong><br/>
                          {record.prescription}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
