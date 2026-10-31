import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useToast } from './Toast';

const AppointmentScheduling = () => {
  const { patients, doctors, appointments, addAppointment, cancelAppointment } = useHospital();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    reason: '',
    type: 'Consultation'
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterView, setFilterView] = useState('all'); // 'today' or 'all'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientId || !formData.doctorId || !formData.date || !formData.time) {
      setMessage('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await addAppointment({
        patientId: parseInt(formData.patientId, 10),
        doctorId: parseInt(formData.doctorId, 10),
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        type: formData.type || 'Consultation',
        status: 'Scheduled'
      });

      showSuccess('Appointment scheduled successfully!');
      setMessage('Appointment scheduled successfully!');
      setFormData({
        patientId: '',
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        reason: '',
        type: 'Consultation'
      });
    } catch (err) {
      console.error('Failed to schedule appointment:', err);
      const errMsg = err.message || 'Failed to schedule appointment. Doctor may not be available or already booked.';
      setMessage(errMsg);
      showError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await cancelAppointment(id);
        showSuccess('Appointment cancelled successfully.');
      } catch (err) {
        showError(err.message || 'Failed to cancel appointment');
      }
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const todayStr = new Date().toISOString().split('T')[0];
  const displayedAppointments = appointments.filter(apt => {
    if (filterView === 'today') return apt.date === todayStr;
    return true;
  });

  return (
    <div className="w-full" style={{ width: '100%', maxWidth: '100%', margin: 0 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Scheduling</h1>
        <p className="text-gray-600">Schedule and manage patient clinical appointments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointment Form */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Schedule New Appointment</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} ({patient.patientId || `P${patient.id}`})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor *</label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.filter(doc => doc.available).map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name} - {doctor.specialization || doctor.specialty || doctor.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={todayStr}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Routine Checkup">Routine Checkup</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of symptoms or consultation reason"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying & Booking...' : 'Schedule Appointment'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm font-medium ${
              message.toLowerCase().includes('success')
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filterView === 'today' ? "Today's Appointments" : "All Appointments"}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFilterView('today')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  filterView === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setFilterView('all')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  filterView === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {displayedAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No appointments scheduled</p>
            ) : (
              displayedAppointments.map(apt => {
                const patient = patients.find(p => p.id === apt.patientId);
                const doctor = doctors.find(d => d.id === apt.doctorId);
                const isCancelled = apt.status?.toLowerCase() === 'cancelled';
                return (
                  <div key={apt.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{patient?.name || 'Patient'}</h3>
                        <p className="text-sm text-gray-600">
                          {doctor ? `Dr. ${doctor.name}` : 'Doctor'} • <span className="text-gray-500">{doctor?.specialization || doctor?.department}</span>
                        </p>
                        <p className="text-sm font-medium text-blue-600 mt-1">
                          📅 {apt.date} at {apt.time}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isCancelled ? 'bg-red-100 text-red-800' :
                          apt.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {apt.status}
                        </span>
                        {!isCancelled && (
                          <button
                            type="button"
                            onClick={() => handleCancelAppointment(apt.id)}
                            className="text-xs text-red-600 hover:text-red-800 underline"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                    {apt.reason && (
                      <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                        <span className="font-medium">Reason:</span> {apt.reason}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduling;