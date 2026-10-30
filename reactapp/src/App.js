import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HospitalProvider } from './context/HospitalContext';
import { ToastProvider } from './components/Toast';
import Login from './components/Login';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboardNew';
import PatientManagement from './components/PatientManagement';
import PatientProfile from './components/PatientProfile';
import AddPatient from './components/AddPatientNew';
import AppointmentScheduling from './components/AppointmentScheduling';
import MedicalRecordViewer from './components/MedicalRecordViewerNew';
import Reports from './components/ReportsNew';
import DepartmentList from './components/DepartmentListNew';
import ReceptionistDashboard from './components/ReceptionistDashboard';

// App Routes Component
function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-medical-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="loading-spinner w-12 h-12"></div>
          <p className="text-neutral-600 font-medium">Loading MediCare...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            user.role === 'admin' ? <AdminDashboard /> :
            user.role === 'doctor' ? <DoctorDashboard /> :
            user.role === 'receptionist' ? <ReceptionistDashboard /> :
            <AdminDashboard /> // fallback for nurse/other roles
          }
        />
        <Route path="/patients" element={<PatientManagement />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/patients/management" element={<PatientManagement />} />
        <Route path="/patients/:id" element={<PatientProfile />} />
        <Route path="/patients/:id/edit" element={<AddPatient />} />
        <Route path="/appointments" element={<AppointmentScheduling />} />
        <Route path="/medical-records" element={<MedicalRecordViewer />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <HospitalProvider>
          <ToastProvider>
            <div className="App">
              <AppRoutes />
            </div>
          </ToastProvider>
        </HospitalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;