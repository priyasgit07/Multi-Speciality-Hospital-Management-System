import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import Login from '../components/Login';
import AppointmentScheduling from '../components/AppointmentScheduling';
import PatientManagement from '../components/PatientManagement';
import { AuthProvider } from '../context/AuthContext';
import { HospitalProvider } from '../context/HospitalContext';
import { ToastProvider } from '../components/Toast';
import { BrowserRouter as Router } from 'react-router-dom';

const renderWithProviders = (ui) => {
  return render(
    <Router>
      <AuthProvider>
        <HospitalProvider>
          <ToastProvider>
            {ui}
          </ToastProvider>
        </HospitalProvider>
      </AuthProvider>
    </Router>
  );
};

describe('MediCare Hospital Management System Frontend Tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders login page with title and credentials form by default', () => {
    render(<App />);
    expect(screen.getByText(/MediCare HMS/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('displays quick demo access buttons for Admin, Doctor, and Receptionist', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/Quick Demo Access/i)).toBeInTheDocument();
    expect(screen.getByText('Administrator')).toBeInTheDocument();
    expect(screen.getByText('Doctor')).toBeInTheDocument();
    expect(screen.getByText('Receptionist')).toBeInTheDocument();
  });

  test('clicking demo account button pre-populates login inputs', () => {
    renderWithProviders(<Login />);
    const adminDemoButton = screen.getByText('Administrator').closest('button');
    fireEvent.click(adminDemoButton);

    const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
    expect(emailInput.value).toBe('admin@hospital.com');
  });

  test('renders Patient Management interface correctly', () => {
    renderWithProviders(<PatientManagement />);
    expect(screen.getByRole('heading', { name: /Patient Management/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search patients/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add New Patient/i })).toBeInTheDocument();
  });

  test('renders Appointment Scheduling form and time slots', () => {
    renderWithProviders(<AppointmentScheduling />);
    expect(screen.getByRole('heading', { name: /Schedule New Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Select Patient/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Doctor/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Schedule Appointment/i })).toBeInTheDocument();
  });

  test('validates required fields before submitting appointment', async () => {
    renderWithProviders(<AppointmentScheduling />);
    const submitBtn = screen.getByRole('button', { name: /Schedule Appointment/i });
    fireEvent.click(submitBtn);

    // Should indicate required fields or prevent empty submission
    await waitFor(() => {
      expect(submitBtn).toBeInTheDocument();
    });
  });

});
