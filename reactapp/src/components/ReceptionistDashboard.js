import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHospital } from '../context/HospitalContext';

export default function ReceptionistDashboard() {
  const { user } = useAuth();
  const { patients, appointments, doctors, loading } = useHospital();
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === today);
  const scheduledToday = todayAppointments.filter(a => a.status === 'SCHEDULED' || a.status === 'scheduled');
  const recentPatients = [...patients].reverse().slice(0, 5);
  const availableDoctors = doctors.filter(d => d.available);

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      sub: `${scheduledToday.length} scheduled`,
      icon: 'calendar',
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/appointments'),
    },
    {
      title: 'Total Patients',
      value: patients.length,
      sub: 'Registered patients',
      icon: 'users',
      color: 'from-emerald-500 to-emerald-600',
      action: () => navigate('/patients'),
    },
    {
      title: 'Available Doctors',
      value: availableDoctors.length,
      sub: `of ${doctors.length} total`,
      icon: 'doctor',
      color: 'from-purple-500 to-purple-600',
      action: null,
    },
    {
      title: 'Quick Register',
      value: '+',
      sub: 'New patient',
      icon: 'add',
      color: 'from-orange-500 to-orange-600',
      action: () => navigate('/patients/add'),
    },
  ];

  const icons = {
    calendar: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
    users: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
    ),
    doctor: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    add: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M12 4v16m8-8H4" />
    ),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="loading-spinner w-10 h-10"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-neutral-500 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/patients/add')}
            className="btn-primary px-5 py-2.5 text-sm"
          >
            + Register Patient
          </button>
          <button
            onClick={() => navigate('/appointments')}
            className="btn-secondary px-5 py-2.5 text-sm"
          >
            View Appointments
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onClick={stat.action || undefined}
            className={`card-premium p-6 ${stat.action ? 'cursor-pointer hover:-translate-y-1 transition-all duration-300' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">{stat.title}</p>
                <p className="text-4xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                <p className="text-xs text-neutral-400 mt-1">{stat.sub}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {icons[stat.icon]}
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's appointments */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-neutral-900">Today's Appointments</h2>
            <button
              onClick={() => navigate('/appointments')}
              className="text-sm text-medical-600 hover:text-medical-700 font-semibold"
            >
              View all →
            </button>
          </div>
          {todayAppointments.length === 0 ? (
            <div className="text-center py-10 text-neutral-400">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">No appointments today</p>
              <button
                onClick={() => navigate('/appointments')}
                className="mt-3 text-xs text-medical-600 underline"
              >
                Schedule one
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {todayAppointments.slice(0, 8).map((appt, idx) => (
                <div key={appt.id || idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{appt.patientName || `Patient #${appt.patientId}`}</p>
                    <p className="text-xs text-neutral-500">{appt.time} · {appt.doctorName || `Dr. #${appt.doctorId}`}</p>
                  </div>
                  <span className={`badge text-xs ${
                    (appt.status || '').toUpperCase() === 'COMPLETED' ? 'bg-success-100 text-success-700' :
                    (appt.status || '').toUpperCase() === 'CANCELLED' ? 'bg-critical-100 text-critical-700' :
                    'bg-medical-100 text-medical-700'
                  }`}>
                    {appt.status || 'Scheduled'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent patients */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-neutral-900">Recent Patients</h2>
            <button
              onClick={() => navigate('/patients')}
              className="text-sm text-medical-600 hover:text-medical-700 font-semibold"
            >
              All patients →
            </button>
          </div>
          {recentPatients.length === 0 ? (
            <div className="text-center py-10 text-neutral-400">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
              </svg>
              <p className="text-sm font-medium">No patients registered yet</p>
              <button
                onClick={() => navigate('/patients/add')}
                className="mt-3 text-xs text-medical-600 underline"
              >
                Register first patient
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPatients.map((patient, idx) => (
                <div
                  key={patient.id || idx}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl cursor-pointer hover:bg-medical-50 transition-colors"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-medical-100 to-medical-200 flex items-center justify-center">
                      <span className="text-sm font-bold text-medical-700">
                        {(patient.name || 'P').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{patient.name}</p>
                      <p className="text-xs text-neutral-500">{patient.phone || patient.email || 'No contact'}</p>
                    </div>
                  </div>
                  <span className={`badge text-xs ${
                    (patient.status || '').toUpperCase() === 'ACTIVE' ? 'bg-success-100 text-success-700' :
                    'bg-neutral-100 text-neutral-600'
                  }`}>
                    {patient.status || 'Active'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="card-premium p-6">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Register Patient', icon: '👤', action: () => navigate('/patients/add') },
            { label: 'Book Appointment', icon: '📅', action: () => navigate('/appointments') },
            { label: 'Patient List', icon: '📋', action: () => navigate('/patients') },
            { label: 'Medical Records', icon: '🗂️', action: () => navigate('/medical-records') },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="flex flex-col items-center gap-2 p-4 bg-neutral-50 hover:bg-medical-50 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-neutral-700 text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
