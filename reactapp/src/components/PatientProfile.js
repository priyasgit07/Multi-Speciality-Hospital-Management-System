import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import { patientService, appointmentService, medicalRecordService } from '../services/api';

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useHospital();

  const [patient, setPatient] = useState(null);
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [pData, apts, recs] = await Promise.all([
          patientService.getPatientById(id),
          appointmentService.getAppointments({ patientId: id }),
          medicalRecordService.getMedicalRecords(id)
        ]);
        setPatient(pData);
        setPatientAppointments(apts || []);
        setPatientRecords(recs || []);
      } catch (err) {
        console.error('Error fetching patient profile:', err);
        setError(err.message || 'Patient not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="loading-spinner"></div>
        <span className="ml-3 text-gray-600">Loading patient profile...</span>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">{error || 'Patient not found'}</h3>
        <button
          onClick={() => navigate('/patients')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/patients')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg text-xl"
            title="Back to Patients"
          >
            ←
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Profile</h1>
            <p className="text-gray-600 mt-2">
              Patient ID: <span className="font-semibold text-blue-600">{patient.patientId || `P${patient.id}`}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/patients/${patient.id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
        >
          Edit Patient
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">
                  {patient.name ? patient.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'P'}
                </span>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                <p className="text-gray-600">{patient.age} years old • {patient.gender}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                  patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {patient.status || 'Active'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-medium">{patient.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{patient.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{patient.address || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="text-gray-900">{patient.dateOfBirth || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="text-gray-900 font-medium text-red-600">{patient.bloodGroup || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="text-gray-900">{patient.emergencyContact || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Insurance Provider</p>
                  <p className="text-gray-900">{patient.insurance || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Visit</p>
                  <p className="text-gray-900">{patient.lastVisit || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Appointments</span>
                <span className="font-bold text-gray-900 text-lg">{patientAppointments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Medical Records</span>
                <span className="font-bold text-gray-900 text-lg">{patientRecords.length}</span>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900">
                {patient.medicalHistory || 'No prior medical conditions recorded.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Appointments History</h3>
          {patientAppointments.length > 0 ? (
            <div className="space-y-4">
              {patientAppointments.map((appointment) => {
                const doctor = doctors.find(d => d.id === appointment.doctorId);
                return (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{doctor ? `Dr. ${doctor.name}` : 'Doctor'}</p>
                        <p className="text-sm text-gray-600">{appointment.type || 'Consultation'} • {appointment.reason || 'General'}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No appointments found</p>
          )}
        </div>

        <div className="card p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Medical Records</h3>
          {patientRecords.length > 0 ? (
            <div className="space-y-4">
              {patientRecords.map((record) => {
                const doctor = doctors.find(d => d.id === record.doctorId);
                return (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{record.diagnosis}</p>
                        <p className="text-sm text-gray-600">{doctor ? `Dr. ${doctor.name}` : 'Attending Physician'}</p>
                      </div>
                      <span className="text-xs text-gray-500">{record.date}</span>
                    </div>
                    {record.treatment && <p className="text-sm text-gray-700 mt-1">{record.treatment}</p>}
                    {record.prescription && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-2">
                        <p className="text-xs font-semibold text-blue-800">Prescription:</p>
                        <p className="text-sm text-blue-700">{record.prescription}</p>
                      </div>
                    )}
                    {record.visitNotes && (
                      <p className="text-xs text-gray-500 italic mt-2">Notes: {record.visitNotes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No medical records found</p>
          )}
        </div>
      </div>
    </div>
  );
}