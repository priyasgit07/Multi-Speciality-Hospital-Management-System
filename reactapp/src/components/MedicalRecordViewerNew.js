import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

const MedicalRecordViewer = () => {
  const { medicalRecords, patients, doctors, departments, addMedicalRecord } = useHospital();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [selectedPatient, setSelectedPatient] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    doctorId: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    visitNotes: ''
  });

  const filteredRecords = medicalRecords.filter(record => {
    const matchesPatient = !selectedPatient || record.patientId === parseInt(selectedPatient, 10);
    const doctor = doctors.find(d => d.id === record.doctorId);
    const matchesDepartment = filterDepartment === 'All' ||
                              record.department === filterDepartment ||
                              doctor?.department === filterDepartment;
    return matchesPatient && matchesDepartment;
  });

  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!newRecord.patientId || !newRecord.diagnosis) {
      showError('Patient and Diagnosis are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const currentDoctor = doctors.find(d => d.email === user.email);
      const doctorId = currentDoctor?.id || (newRecord.doctorId ? parseInt(newRecord.doctorId, 10) : doctors[0]?.id);
      const matchedDoctor = doctors.find(d => d.id === doctorId);

      await addMedicalRecord({
        patientId: parseInt(newRecord.patientId, 10),
        doctorId: doctorId || null,
        date: new Date().toISOString().split('T')[0],
        diagnosis: newRecord.diagnosis,
        treatment: newRecord.treatment,
        prescription: newRecord.prescription,
        visitNotes: newRecord.visitNotes,
        department: matchedDoctor?.department || 'General Medicine'
      });

      showSuccess('Medical record created successfully');
      setNewRecord({ patientId: '', doctorId: '', diagnosis: '', treatment: '', prescription: '', visitNotes: '' });
      setShowAddRecord(false);
    } catch (err) {
      console.error('Failed to create medical record:', err);
      showError(err.message || 'Failed to create medical record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPatientName = (id) => patients.find(p => p.id === id)?.name || 'Unknown Patient';
  const getDoctorName = (id) => doctors.find(d => d.id === id)?.name || 'Staff Physician';

  const canAddRecord = user?.role === 'doctor' || user?.role === 'admin';

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
        <p className="text-gray-600">Centralized patient medical record management</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 flex-wrap">
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Patients</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>

          {canAddRecord && (
            <button
              onClick={() => setShowAddRecord(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
            >
              Add Medical Record
            </button>
          )}
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Medical Record</h2>

            <form onSubmit={handleAddRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
                <select
                  value={newRecord.patientId}
                  onChange={(e) => setNewRecord({...newRecord, patientId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>

              {user?.role === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attending Doctor</label>
                  <select
                    value={newRecord.doctorId}
                    onChange={(e) => setNewRecord({...newRecord, doctorId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map(doc => (
                      <option key={doc.id} value={doc.id}>Dr. {doc.name} ({doc.department})</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis *</label>
                <textarea
                  value={newRecord.diagnosis}
                  onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Primary clinical diagnosis"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Plan</label>
                <textarea
                  value={newRecord.treatment}
                  onChange={(e) => setNewRecord({...newRecord, treatment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Therapy, procedures, or lifestyle recommendations"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prescription</label>
                <textarea
                  value={newRecord.prescription}
                  onChange={(e) => setNewRecord({...newRecord, prescription: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Medication name, dosage, and frequency"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visit Notes</label>
                <textarea
                  value={newRecord.visitNotes}
                  onChange={(e) => setNewRecord({...newRecord, visitNotes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Clinical observations and progress notes"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Record'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddRecord(false)}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Medical Records List */}
      <div className="space-y-6">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No medical records found matching your criteria.</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {getPatientName(record.patientId)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dr. {getDoctorName(record.doctorId)} • {record.department || 'General'} • {record.date}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {record.department || 'Clinical'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{record.diagnosis}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Treatment</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{record.treatment || 'No treatment specified'}</p>
                </div>

                {record.prescription && (
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-900 mb-2">Prescription</h4>
                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
                      {record.prescription}
                    </p>
                  </div>
                )}

                {record.visitNotes && (
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-900 mb-2">Visit Notes</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md italic">{record.visitNotes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <span className="text-2xl">📋</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{medicalRecords.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Patients with Records</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(medicalRecords.map(r => r.patientId)).size}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <span className="text-2xl">🏥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(medicalRecords.map(r => r.department).filter(Boolean)).size || 1}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordViewer;