import React, { useContext, useState } from "react";
import { HospitalContext } from "../context/PatientContext";

const Reports = () => {
  const { patients, doctors, appointments, medicalRecords, departments } = useContext(HospitalContext);
  const [activeReport, setActiveReport] = useState("overview");

  const getPatientVisitsReport = () => {
    return patients.map(patient => {
      const patientAppointments = appointments.filter(apt => apt.patientId === patient.id);
      const patientRecords = medicalRecords.filter(rec => rec.patientId === patient.id);
      return {
        ...patient,
        totalVisits: patientRecords.length,
        scheduledAppointments: patientAppointments.filter(apt => apt.status === "Scheduled").length,
        completedAppointments: patientAppointments.filter(apt => apt.status === "Completed").length
      };
    });
  };

  const getDepartmentWorkloadReport = () => {
    return departments.map(dept => {
      const deptDoctors = doctors.filter(doc => doc.department === dept.name);
      const deptRecords = medicalRecords.filter(rec => {
        const doctor = doctors.find(d => d.id === rec.doctorId);
        return doctor?.department === dept.name;
      });
      const deptAppointments = appointments.filter(apt => {
        const doctor = doctors.find(d => d.id === apt.doctorId);
        return doctor?.department === dept.name;
      });

      return {
        ...dept,
        totalDoctors: deptDoctors.length,
        availableDoctors: deptDoctors.filter(doc => doc.available).length,
        totalRecords: deptRecords.length,
        totalAppointments: deptAppointments.length
      };
    });
  };

  const getDoctorScheduleReport = () => {
    return doctors.map(doctor => {
      const doctorAppointments = appointments.filter(apt => apt.doctorId === doctor.id);
      const doctorRecords = medicalRecords.filter(rec => rec.doctorId === doctor.id);

      return {
        ...doctor,
        totalAppointments: doctorAppointments.length,
        scheduledAppointments: doctorAppointments.filter(apt => apt.status === "Scheduled").length,
        completedAppointments: doctorAppointments.filter(apt => apt.status === "Completed").length,
        totalTreatments: doctorRecords.length
      };
    });
  };

  const renderOverviewReport = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#e7f3ff" }}>
        <h3>Total Patients</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#007bff" }}>{patients.length}</p>
      </div>
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f0f9ff" }}>
        <h3>Total Doctors</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#28a745" }}>{doctors.length}</p>
      </div>
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff3cd" }}>
        <h3>Total Appointments</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#856404" }}>{appointments.length}</p>
      </div>
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f8d7da" }}>
        <h3>Medical Records</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#721c24" }}>{medicalRecords.length}</p>
      </div>
    </div>
  );

  const renderPatientVisitsReport = () => {
    const data = getPatientVisitsReport();
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Patient Name</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Age</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Total Visits</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Scheduled</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Completed</th>
            </tr>
          </thead>
          <tbody>
            {data.map(patient => (
              <tr key={patient.id}>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{patient.name}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{patient.age}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{patient.totalVisits}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{patient.scheduledAppointments}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{patient.completedAppointments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDepartmentWorkloadReport = () => {
    const data = getDepartmentWorkloadReport();
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Department</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Total Doctors</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Available</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Total Records</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Appointments</th>
            </tr>
          </thead>
          <tbody>
            {data.map(dept => (
              <tr key={dept.id}>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{dept.name}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{dept.totalDoctors}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{dept.availableDoctors}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{dept.totalRecords}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{dept.totalAppointments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDoctorScheduleReport = () => {
    const data = getDoctorScheduleReport();
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Doctor Name</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Specialty</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Total Appointments</th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6", textAlign: "left" }}>Treatments</th>
            </tr>
          </thead>
          <tbody>
            {data.map(doctor => (
              <tr key={doctor.id}>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{doctor.name}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{doctor.specialty}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  <span style={{ color: doctor.available ? "green" : "red" }}>
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{doctor.totalAppointments}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{doctor.totalTreatments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hospital Reports & Analytics</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveReport("overview")}
          style={{
            padding: "8px 15px",
            margin: "0 5px",
            backgroundColor: activeReport === "overview" ? "#007bff" : "#f8f9fa",
            color: activeReport === "overview" ? "white" : "#333",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveReport("patients")}
          style={{
            padding: "8px 15px",
            margin: "0 5px",
            backgroundColor: activeReport === "patients" ? "#007bff" : "#f8f9fa",
            color: activeReport === "patients" ? "white" : "#333",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Patient Visits
        </button>
        <button
          onClick={() => setActiveReport("departments")}
          style={{
            padding: "8px 15px",
            margin: "0 5px",
            backgroundColor: activeReport === "departments" ? "#007bff" : "#f8f9fa",
            color: activeReport === "departments" ? "white" : "#333",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Department Workload
        </button>
        <button
          onClick={() => setActiveReport("doctors")}
          style={{
            padding: "8px 15px",
            margin: "0 5px",
            backgroundColor: activeReport === "doctors" ? "#007bff" : "#f8f9fa",
            color: activeReport === "doctors" ? "white" : "#333",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Doctor Schedules
        </button>
      </div>

      <div style={{ border: "1px solid #dee2e6", borderRadius: "8px", padding: "20px", backgroundColor: "white" }}>
        {activeReport === "overview" && renderOverviewReport()}
        {activeReport === "patients" && renderPatientVisitsReport()}
        {activeReport === "departments" && renderDepartmentWorkloadReport()}
        {activeReport === "doctors" && renderDoctorScheduleReport()}
      </div>
    </div>
  );
};

export default Reports;