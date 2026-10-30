import React, { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { HospitalContext } from '../context/PatientContext';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { patients, doctors, appointments, medicalRecords, departments } = useContext(HospitalContext);
  const history = useHistory();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getQuickStats = () => {
    const todayAppointments = appointments.filter(apt =>
      apt.date === new Date().toISOString().split('T')[0]
    );

    const userAppointments = user.role === 'doctor'
      ? appointments.filter(apt => {
          const doctor = doctors.find(d => d.id === apt.doctorId);
          return doctor?.name === user.name;
        })
      : appointments;

    return {
      totalPatients: patients.length,
      todayAppointments: todayAppointments.length,
      totalDoctors: doctors.length,
      availableDoctors: doctors.filter(d => d.available).length,
      totalRecords: medicalRecords.length,
      userAppointments: userAppointments.length
    };
  };

  const stats = getQuickStats();

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <div
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #e1e5e9',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
      }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px'
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          {description}
        </p>
      </div>
    </div>
  );

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      border: '1px solid #e1e5e9'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px'
        }}>
          {icon}
        </div>
        {trend && (
          <span style={{
            fontSize: '12px',
            color: trend > 0 ? '#28a745' : '#dc3545',
            fontWeight: '600'
          }}>
            {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700', color: '#333' }}>
        {value}
      </h3>
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
        {title}
      </p>
    </div>
  );

  const getQuickActions = () => {
    const baseActions = [
      {
        title: 'View Patients',
        description: 'Browse patient records',
        icon: '👥',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        onClick: () => history.push('/patients')
      },
      {
        title: 'Medical Records',
        description: 'Access treatment history',
        icon: '📋',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        onClick: () => history.push('/medical-records')
      }
    ];

    if (user.role === 'admin' || user.role === 'receptionist') {
      baseActions.unshift({
        title: 'Schedule Appointment',
        description: 'Book new appointments',
        icon: '📅',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        onClick: () => history.push('/appointments')
      });
    }

    if (user.role === 'doctor') {
      baseActions.unshift({
        title: 'Doctor Dashboard',
        description: 'Manage your patients',
        icon: '🩺',
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        onClick: () => history.push('/doctor-dashboard')
      });
    }

    if (user.role === 'admin') {
      baseActions.push({
        title: 'Reports & Analytics',
        description: 'View system reports',
        icon: '📊',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        onClick: () => history.push('/reports')
      });
    }

    return baseActions;
  };

  const recentAppointments = appointments
    .filter(apt => {
      if (user.role === 'doctor') {
        const doctor = doctors.find(d => d.id === apt.doctorId);
        return doctor?.name === user.name;
      }
      return true;
    })
    .slice(-5);

  return (
    <div style={{ padding: '24px', background: '#f8f9fa', minHeight: 'calc(100vh - 80px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#333', margin: '0 0 8px 0' }}>
          {getGreeting()}, {user.name}!
        </h1>
        <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
          Welcome to your {user.role} dashboard. Here's what's happening today.
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon="👥"
          color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          trend={12}
        />
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon="📅"
          color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          trend={8}
        />
        <StatCard
          title="Available Doctors"
          value={`${stats.availableDoctors}/${stats.totalDoctors}`}
          icon="👨⚕️"
          color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          trend={-3}
        />
        <StatCard
          title="Medical Records"
          value={stats.totalRecords}
          icon="📋"
          color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
          trend={15}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {getQuickActions().map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
            Recent Appointments
          </h2>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e1e5e9'
          }}>
            {recentAppointments.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', margin: '20px 0' }}>
                No recent appointments
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentAppointments.map(apt => {
                  const patient = patients.find(p => p.id === apt.patientId);
                  const doctor = doctors.find(d => d.id === apt.doctorId);
                  return (
                    <div key={apt.id} style={{
                      padding: '12px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      background: '#f8f9fa'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: '0 0 4px 0', fontWeight: '600', fontSize: '14px' }}>
                            {patient?.name}
                          </p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                            {doctor?.name} • {apt.date} at {apt.time}
                          </p>
                        </div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: '600',
                          background: apt.status === 'Completed' ? '#d4edda' : '#fff3cd',
                          color: apt.status === 'Completed' ? '#155724' : '#856404'
                        }}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;