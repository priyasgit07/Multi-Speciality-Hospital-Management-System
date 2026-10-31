import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { EmptyAppointments } from './HealthcareIllustrations';

export default function AdminDashboard() {
  const { patients, doctors, appointments, departments } = useHospital();

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      change: '+12%',
      trend: 'up',
      icon: 'users',
      variant: 'primary'
    },
    {
      title: 'Active Doctors',
      value: doctors.filter(d => d.available).length,
      change: '+5%',
      trend: 'up',
      icon: 'user-check',
      variant: 'success'
    },
    {
      title: 'Today Appointments',
      value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
      change: '+8%',
      trend: 'up',
      icon: 'calendar',
      variant: 'warning'
    },
    {
      title: 'Departments',
      value: departments.length,
      change: '0%',
      trend: 'stable',
      icon: 'building',
      variant: 'critical'
    }
  ];

  const recentPatients = patients.slice(-5).reverse();
  const todayAppointments = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]);

  const getIcon = (iconName) => {
    const icons = {
      users: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
      ),
      'user-check': (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      calendar: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      ),
      building: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      )
    };
    return icons[iconName] || icons.users;
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
      {/* Premium Hero Section with Illustration */}
      <div className="card-premium overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-4">Hospital Administration Dashboard</h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Comprehensive system overview and key performance metrics for efficient healthcare management.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-medical-600">{patients.length}</p>
                <p className="text-sm text-neutral-500 font-medium">Total Patients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-success-600">{doctors.filter(d => d.available).length}</p>
                <p className="text-sm text-neutral-500 font-medium">Active Doctors</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-warning-600">{departments.length}</p>
                <p className="text-sm text-neutral-500 font-medium">Departments</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
  <img
    src="/new.png"
    alt="Dashboard"
    className="w-full h-64 lg:h-80 object-contain"
  />
</div>
        </div>
      </div>

      {/* Premium Key Metrics Grid */}
      <div className="grid-stats">
        {stats.map((stat, index) => (
          <div key={index} className={`${getStatCardClass(stat.variant)} group animation-delay-${index * 100}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-2xl bg-white/50 group-hover:scale-110 transition-transform duration-300`}>
                    <svg className={`h-7 w-7 ${getIconColor(stat.variant)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {getIcon(stat.icon)}
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">{stat.title}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-4xl font-bold text-neutral-900 group-hover:scale-105 transition-transform duration-300">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm font-semibold ${
                      stat.trend === 'up' ? 'text-success-600' :
                      stat.trend === 'down' ? 'text-critical-600' : 'text-neutral-500'
                    }`}>
                      {stat.change}
                    </span>
                    {stat.trend === 'up' && (
                      <svg className="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Dashboard Grid */}
      <div className="grid-dashboard">
        {/* Recent Patients - Premium Table */}
        <div className="table-container col-span-1 lg:col-span-2">
          <div className="table-header">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">Recent Patient Registrations</h3>
              <span className="badge-info">Latest 5</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
                <tr>
                  <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Patient</th>
                  <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Patient ID</th>
                  <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-medical-100 to-medical-200 rounded-xl flex items-center justify-center">
                          <span className="text-sm font-bold text-medical-700">
                            {patient.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-neutral-900">{patient.name}</div>
                          <div className="text-sm text-neutral-500">Age: {patient.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="font-mono text-sm font-medium text-neutral-700">{patient.patientId}</span>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        patient.status === 'Active' ? 'badge-success' : 'badge-critical'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Appointments - Premium Table with Empty State */}
        <div className="table-container">
          <div className="table-header">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">Today's Appointments</h3>
              <span className="badge-warning">{todayAppointments.length} scheduled</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
                <tr>
                  <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Time</th>
                  <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Patient</th>
                  <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {todayAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="table-cell text-center py-16">
                      <div className="flex flex-col items-center space-y-4">
                        <EmptyAppointments className="w-24 h-24" />
                        <div>
                          <p className="text-lg font-semibold text-neutral-600 mb-1">No appointments scheduled</p>
                          <p className="text-neutral-500">Your schedule is clear for today</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  todayAppointments.map((appointment) => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    return (
                      <tr key={appointment.id} className="table-row">
                        <td className="table-cell">
                          <span className="font-mono text-sm font-semibold text-neutral-900">{appointment.time}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium text-neutral-900">{patient?.name || 'Unknown Patient'}</span>
                        </td>
                        <td className="table-cell">
                          <span className={`badge ${
                            appointment.status === 'Scheduled' ? 'badge-info' :
                            appointment.status === 'Completed' ? 'badge-success' :
                            'badge-warning'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Department Overview - Premium Table */}
      <div className="table-container">
        <div className="table-header">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-900">Department Overview</h3>
            <span className="badge-neutral">{departments.length} departments</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
              <tr>
                <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Department</th>
                <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Department Head</th>
                <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Bed Occupancy</th>
                <th className="table-cell text-left text-xs font-bold text-neutral-600 uppercase tracking-wider">Occupancy Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {departments.map((dept) => {
                const occupancyRate = ((dept.occupancy / dept.beds) * 100).toFixed(1);
                const isHighOccupancy = occupancyRate > 80;
                return (
                  <tr key={dept.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-medical-100 to-medical-200 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-neutral-900">{dept.name}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="text-sm font-medium text-neutral-700">{dept.head}</span>
                    </td>
                    <td className="table-cell">
                      <span className="font-mono text-sm font-medium text-neutral-900">
                        {dept.occupancy} / {dept.beds}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-neutral-200 rounded-full h-3 max-w-24">
                          <div
                            className={`h-3 rounded-full transition-all duration-700 ${
                              isHighOccupancy ? 'bg-gradient-to-r from-warning-400 to-critical-500' : 'bg-gradient-to-r from-medical-400 to-medical-600'
                            }`}
                            style={{ width: `${occupancyRate}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-bold min-w-12 ${
                          isHighOccupancy ? 'text-critical-600' : 'text-neutral-900'
                        }`}>
                          {occupancyRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}