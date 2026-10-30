import React, { useContext, useState } from "react";
import { HospitalContext } from "../context/PatientContext";

const AppointmentScheduler = () => {
  const { patients, doctors, appointments, scheduleAppointment } = useContext(HospitalContext);
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientId || !formData.doctorId || !formData.date || !formData.time) {
      setMessage("Please fill all fields");
      return;
    }

    const conflictingAppointment = appointments.find(apt =>
      apt.doctorId === parseInt(formData.doctorId) &&
      apt.date === formData.date &&
      apt.time === formData.time
    );

    if (conflictingAppointment) {
      setMessage("Doctor is not available at this time");
      return;
    }

    scheduleAppointment({
      patientId: parseInt(formData.patientId),
      doctorId: parseInt(formData.doctorId),
      date: formData.date,
      time: formData.time
    });

    setMessage("Appointment scheduled successfully!");
    setFormData({ patientId: "", doctorId: "", date: "", time: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Schedule Appointment</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>Patient:</label>
          <select name="patientId" value={formData.patientId} onChange={handleChange} style={{ width: "100%", padding: "8px" }}>
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Doctor:</label>
          <select name="doctorId" value={formData.doctorId} onChange={handleChange} style={{ width: "100%", padding: "8px" }}>
            <option value="">Select Doctor</option>
            {doctors.filter(doc => doc.available).map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Time:</label>
          <select name="time" value={formData.time} onChange={handleChange} style={{ width: "100%", padding: "8px" }}>
            <option value="">Select Time</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
          </select>
        </div>

        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
          Schedule Appointment
        </button>
      </form>

      {message && <p style={{ color: message.includes("success") ? "green" : "red", marginTop: "10px" }}>{message}</p>}

      <div style={{ marginTop: "30px" }}>
        <h3>Scheduled Appointments</h3>
        {appointments.map(apt => {
          const patient = patients.find(p => p.id === apt.patientId);
          const doctor = doctors.find(d => d.id === apt.doctorId);
          return (
            <div key={apt.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "5px 0", borderRadius: "3px" }}>
              <strong>{patient?.name}</strong> with <strong>{doctor?.name}</strong><br/>
              Date: {apt.date} | Time: {apt.time} | Status: {apt.status}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentScheduler;