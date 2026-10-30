import React, { useContext, useState } from "react";
import { HospitalContext } from "../context/PatientContext";
import { useParams, useHistory } from "react-router-dom";

const RoomStatus = () => {
  const { id } = useParams();
  const history = useHistory();
  const { patients } = useContext(HospitalContext);
  const [status, setStatus] = useState("Available");
  const [message, setMessage] = useState("");

  const patient = patients.find(p => p.id === Number(id));

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

  const handleStatusUpdate = () => {
    setMessage(`Room status updated to ${status} for ${patient.name}`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Room Status Management</h2>

      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", marginBottom: "20px", backgroundColor: "#f9f9f9" }}>
        <h3>{patient.name}</h3>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Update Room Status:</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "15px" }}
        >
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Under Maintenance</option>
          <option value="Reserved">Reserved</option>
        </select>

        <button
          onClick={handleStatusUpdate}
          style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", marginRight: "10px" }}
        >
          Update Status
        </button>

        <button
          onClick={() => history.push(`/patient/${patient.id}`)}
          style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}
        >
          Back to Patient
        </button>
      </div>

      {message && (
        <div style={{ padding: "10px", backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb", borderRadius: "4px", marginBottom: "20px" }}>
          {message}
        </div>
      )}

      <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px", backgroundColor: "#e7f3ff" }}>
        <h4>Room Management Info</h4>
        <p><strong>Current Status:</strong> {status}</p>
        <p><strong>Last Updated:</strong> {new Date().toLocaleString()}</p>
        <p><strong>Room Assignment:</strong> Room #{patient.id}01</p>
      </div>
    </div>
  );
};

export default RoomStatus;
