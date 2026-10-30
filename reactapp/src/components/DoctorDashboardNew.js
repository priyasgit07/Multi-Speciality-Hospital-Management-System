import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';
import { PremiumDoctorPortrait } from './PremiumDoctorIllustrations';
import { EmptyAppointments } from './HealthcareIllustrations';

const DoctorDashboard = () => {
  const { appointments, patients, doctors, updateDoctorAvailability } = useHospital();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const currentDoctor = doctors.find(d => d.email === user?.email) || doctors[0];
  const [isAvailable, setIsAvailable] = useState(currentDoctor?.available ?? true);

  const todayAppointments = appointments.filter(apt =>
    apt.doctorId === currentDoctor?.id && apt.date === selectedDate
  );

  const myPatients = patients.filter(patient =>
    appointments.some(apt => apt.patientId === patient.id && apt.doctorId === currentDoctor?.id)
  );

  const handleAvailabilityToggle = async () => {
    if (!currentDoctor) return;
    const nextState = !isAvailable;
    setIsAvailable(nextState);
    try {
      await updateDoctorAvailability(currentDoctor.id, nextState);
    } catch (e) {
      console.error('Failed to toggle availability:', e);
      setIsAvailable(!nextState);
    }
  };

  const getPatientById = (id) => patients.find(p => p.id === id);

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: 'calendar',
      variant: 'primary',
      change: '+3 from yesterday'
    },
    {
      title: 'My Patients',
      value: myPatients.length,
      icon: 'users',
      variant: 'success',
      change: 'Total under care'
    },
    {
      title: 'Department',
      value: currentDoctor?.department || 'General',
      icon: 'building',
      variant: 'warning',
      change: 'Specialty'
    },
    {
      title: 'Availability',
      value: isAvailable ? 'Available' : 'Unavailable',
      icon: 'status',
      variant: isAvailable ? 'success' : 'critical',
      change: 'Current status'
    }
  ];

  const getIcon = (iconName) => {
    const icons = {
      calendar: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      ),
      users: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
      ),
      building: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      ),
      status: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      )
    };
    return icons[iconName] || icons.calendar;
  };

  const getStatCardClass = (variant) => {
    const variants = {
      primary: 'stats-card-primary',
      success: 'stats-card-success',
      warning: 'stats-card-warning',
      critical: 'stats-card-critical'
    };
    return variants[variant] || 'stats-card';
  };

  const getIconColor = (variant) => {
    const colors = {
      primary: 'text-medical-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      critical: 'text-critical-600'
    };
    return colors[variant] || 'text-medical-600';
  };

  return (
    <div className="w-full space-y-10 animate-fade-in">
      {/* Premium Hero Section with Doctor Illustration */}
      <div className="card-premium overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-4">Doctor Dashboard</h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Welcome back, Dr. {currentDoctor?.name}. Manage your appointments and patient care efficiently.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-medical-600">{todayAppointments.length}</p>
                <p className="text-sm text-neutral-500 font-medium">Today's Appointments</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-success-600">{myPatients.length}</p>
                <p className="text-sm text-neutral-500 font-medium">My Patients</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-600">Status</p>
                  <p className={`text-lg font-bold ${
                    isAvailable ? 'text-success-600' : 'text-critical-600'
                  }`}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </p>
                </div>
                <button
                  onClick={handleAvailabilityToggle}
                  className={`${
                    isAvailable ? 'btn-critical' : 'btn-success'
                  } touch-feedback text-sm px-4 py-2`}
                >
                  {isAvailable ? 'Set Unavailable' : 'Set Available'}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <PremiumDoctorPortrait className="w-full h-64 lg:h-80" />
          </div>
        </div>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid-stats">
        {stats.map((stat, index) => (
          <div key={index} className={`${getStatCardClass(stat.variant)} group animation-delay-${index * 100}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-2xl bg-white/50 group-hover:scale-110 transition-transform duration-300">
                    <svg className={`h-7 w-7 ${getIconColor(stat.variant)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {getIcon(stat.icon)}
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">{stat.title}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-neutral-900 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-500 font-medium">{stat.change}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Dashboard Grid */}
      <div className="grid-dashboard">
        {/* Today's Appointments - Premium with Enhanced Empty State */}
        <div className="card-elevated col-span-1 lg:col-span-2">
          <div className="table-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">Today's Appointments</h2>
              <div className="flex items-center space-x-3">
                <span className="badge-info">{todayAppointments.length} scheduled</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field text-sm py-2 px-3 max-w-40"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-16">
                  <div className="flex flex-col items-center space-y-6">
                    <EmptyAppointments className="w-32 h-32" />
                    <div>
                      <p className="text-xl font-bold text-neutral-700 mb-2">No appointments for this date</p>
                      <p className="text-neutral-500 text-lg">Your schedule is clear for {new Date(selectedDate).toLocaleDateString()}</p>
                      <p className="text-neutral-400 text-sm mt-2">Enjoy some well-deserved rest or catch up on administrative tasks</p>
                    </div>
                  </div>
                </div>
              ) : (
                todayAppointments.map((appointment) => {
                  const patient = getPatientById(appointment.patientId);
                  return (
                    <div key={appointment.id} className="card p-6 hover:shadow-elevated">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-medical-100 to-medical-200 rounded-2xl flex items-center justify-center">
                            <span className="text-lg font-bold text-medical-700">
                              {patient?.name?.charAt(0).toUpperCase() || 'P'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-neutral-900">{patient?.name || 'Unknown Patient'}</h3>
                            <div className="space-y-1 mt-2">
                              <p className="text-sm text-neutral-600">
                                <span className="font-semibold">Time:</span> {appointment.time}
                              </p>
                              <p className="text-sm text-neutral-600">
                                <span className="font-semibold">Type:</span> {appointment.type}
                              </p>
                              {appointment.reason && (
                                <p className="text-sm text-neutral-600">
                                  <span className="font-semibold">Reason:</span> {appointment.reason}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className={`badge ${
                          appointment.status === 'Scheduled' ? 'badge-info' :
                          appointment.status === 'Completed' ? 'badge-success' :
                          'badge-warning'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Recent Patients - Premium */}
        <div className="card-elevated">
          <div className="table-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">Recent Patients</h2>
              <span className="badge-success">{myPatients.length} total</span>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {myPatients.slice(0, 5).map((patient) => (
                <div key={patient.id} className="card p-4 hover:shadow-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-success-100 to-success-200 rounded-xl flex items-center justify-center">
                        <span className="text-sm font-bold text-success-700">
                          {patient.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-neutral-900">{patient.name}</h3>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm text-neutral-600">Age: {patient.age} • {patient.gender}</p>
                          <p className="text-sm text-neutral-600">Last Visit: {patient.lastVisit}</p>
                          {patient.medicalHistory && (
                            <p className="text-xs text-neutral-500 mt-2 line-clamp-2">{patient.medicalHistory}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="btn-ghost text-medical-600 hover:text-medical-700 text-sm">
                      View Records
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Quick Actions */}
      <div className="card-elevated">
        <div className="table-header">
          <h2 className="text-xl font-bold text-neutral-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="card-interactive p-6 text-left group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-medical-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-neutral-900 group-hover:text-medical-600 transition-colors duration-300">Add Medical Record</p>
                  <p className="text-sm text-neutral-600 mt-1">Create new patient record</p>
                </div>
              </div>
            </button>

            <button className="card-interactive p-6 text-left group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-success-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-neutral-900 group-hover:text-success-600 transition-colors duration-300">View Schedule</p>
                  <p className="text-sm text-neutral-600 mt-1">Check upcoming appointments</p>
                </div>
              </div>
            </button>

            <button className="card-interactive p-6 text-left group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-warning-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-neutral-900 group-hover:text-warning-600 transition-colors duration-300">Patient Reports</p>
                  <p className="text-sm text-neutral-600 mt-1">Generate patient reports</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;