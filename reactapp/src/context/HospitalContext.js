import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  patientService,
  doctorService,
  departmentService,
  appointmentService,
  medicalRecordService
} from '../services/api';
import { useAuth } from './AuthContext';

const HospitalContext = createContext();

export function HospitalProvider({ children }) {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        patientsRes,
        doctorsRes,
        departmentsRes,
        appointmentsRes,
        recordsRes
      ] = await Promise.allSettled([
        patientService.getPatients(),
        doctorService.getDoctors(),
        departmentService.getDepartments(),
        appointmentService.getAppointments(),
        medicalRecordService.getMedicalRecords()
      ]);

      if (patientsRes.status === 'fulfilled') setPatients(patientsRes.value);
      if (doctorsRes.status === 'fulfilled') setDoctors(doctorsRes.value);
      if (departmentsRes.status === 'fulfilled') setDepartments(departmentsRes.value);
      if (appointmentsRes.status === 'fulfilled') setAppointments(appointmentsRes.value);
      if (recordsRes.status === 'fulfilled') setMedicalRecords(recordsRes.value);
    } catch (err) {
      console.error('Error fetching hospital data:', err);
      setError(err.message || 'Failed to fetch hospital data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchAllData();
    } else {
      setLoading(false);
    }
  }, [user, fetchAllData]);

  const addPatient = async (patientData) => {
    try {
      const savedPatient = await patientService.createPatient(patientData);
      setPatients(prev => [...prev, savedPatient]);
      setAuditLogs(prev => [
        ...prev,
        { action: 'ADD_PATIENT', timestamp: new Date().toISOString(), data: savedPatient }
      ]);
      return savedPatient;
    } catch (err) {
      console.error('Failed to add patient:', err);
      throw err;
    }
  };

  const updatePatient = async (patientData) => {
    try {
      const updatedPatient = await patientService.updatePatient(patientData.id, patientData);
      setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
      setAuditLogs(prev => [
        ...prev,
        { action: 'UPDATE_PATIENT', timestamp: new Date().toISOString(), data: updatedPatient }
      ]);
      return updatedPatient;
    } catch (err) {
      console.error('Failed to update patient:', err);
      throw err;
    }
  };

  const deletePatient = async (id) => {
    try {
      await patientService.deletePatient(id);
      setPatients(prev => prev.filter(p => p.id !== id));
      setAppointments(prev => prev.filter(a => a.patientId !== id));
      setMedicalRecords(prev => prev.filter(r => r.patientId !== id));
      setAuditLogs(prev => [
        ...prev,
        { action: 'DELETE_PATIENT', timestamp: new Date().toISOString(), data: { id } }
      ]);
    } catch (err) {
      console.error('Failed to delete patient:', err);
      throw err;
    }
  };

  const addAppointment = async (appointmentData) => {
    try {
      const savedAppointment = await appointmentService.createAppointment(appointmentData);
      setAppointments(prev => [...prev, savedAppointment]);
      setAuditLogs(prev => [
        ...prev,
        { action: 'ADD_APPOINTMENT', timestamp: new Date().toISOString(), data: savedAppointment }
      ]);
      return savedAppointment;
    } catch (err) {
      console.error('Failed to add appointment:', err);
      throw err;
    }
  };

  const updateAppointment = async (appointmentData) => {
    try {
      const updated = await appointmentService.updateAppointment(appointmentData.id, appointmentData);
      setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
      return updated;
    } catch (err) {
      console.error('Failed to update appointment:', err);
      throw err;
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const cancelled = await appointmentService.cancelAppointment(id);
      setAppointments(prev => prev.map(a => a.id === id ? cancelled : a));
      setAuditLogs(prev => [
        ...prev,
        { action: 'CANCEL_APPOINTMENT', timestamp: new Date().toISOString(), data: { id } }
      ]);
      return cancelled;
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
      throw err;
    }
  };

  const updateDoctorAvailability = async (id, available) => {
    try {
      const updated = await doctorService.updateAvailability(id, available);
      setDoctors(prev => prev.map(d => d.id === id ? updated : d));
      return updated;
    } catch (err) {
      console.error('Failed to update doctor availability:', err);
      throw err;
    }
  };

  const addMedicalRecord = async (recordData) => {
    try {
      const savedRecord = await medicalRecordService.createMedicalRecord(recordData);
      setMedicalRecords(prev => [...prev, savedRecord]);
      setAuditLogs(prev => [
        ...prev,
        { action: 'ADD_MEDICAL_RECORD', timestamp: new Date().toISOString(), data: savedRecord }
      ]);
      return savedRecord;
    } catch (err) {
      console.error('Failed to add medical record:', err);
      throw err;
    }
  };

  const value = {
    patients,
    doctors,
    departments,
    appointments,
    medicalRecords,
    auditLogs,
    loading,
    error,
    refreshData: fetchAllData,
    addPatient,
    updatePatient,
    deletePatient,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    updateDoctorAvailability,
    addMedicalRecord
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
}