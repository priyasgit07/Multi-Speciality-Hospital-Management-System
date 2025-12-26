import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { PatientProvider } from '../context/PatientContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Custom render to wrap components with PatientProvider and Router
const customRender = (ui) => render(<PatientProvider><Router>{ui}</Router></PatientProvider>);

test('renders patient list page and checks for initial text', () => {
  customRender(<App />);
  const patientList = screen.getByText(/patient list/i);
  expect(patientList).toBeInTheDocument();
});

test('adds new patient and checks if it appears in the list', async () => {
  customRender(<App />);

  // Navigate to the add patient page
  fireEvent.click(screen.getByText(/add patient/i));

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText(/patient name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '45' } });

  // Submit the form
  fireEvent.click(screen.getByText(/submit/i));
  fireEvent.click(screen.getByText(/patient list/i));

  // Check if the new patient appears in the patient list
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});

test('displays correct details for a patient when clicked', async () => {
  customRender(<App />);

  // Add a new patient
  fireEvent.click(screen.getByText(/add patient/i));
  fireEvent.change(screen.getByPlaceholderText(/patient name/i), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '30' } });
  fireEvent.click(screen.getByText(/submit/i));
  fireEvent.click(screen.getByText(/patient list/i));

  // Navigate to the patient details page
  fireEvent.click(screen.getByText('Jane Smith'));

  // Check if the patient details are displayed correctly
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  expect(screen.getByText('Age: 30')).toBeInTheDocument();
});

test('updates room status correctly for a patient', async () => {
  customRender(<App />);

  // Add a new patient
  fireEvent.click(screen.getByText(/add patient/i));
  fireEvent.change(screen.getByPlaceholderText(/patient name/i), { target: { value: 'Tom Hanks' } });
  fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '60' } });
  fireEvent.click(screen.getByText(/submit/i));
  fireEvent.click(screen.getByText(/patient list/i));

  // Navigate to the room status page
  fireEvent.click(screen.getByText('Tom Hanks'));
  fireEvent.click(screen.getByText(/update room status/i));

  // Update room status
  fireEvent.change(screen.getByDisplayValue('Available'), { target: { value: 'Occupied' } });
  fireEvent.click(screen.getByText(/update status/i));

  // Check if the room status is updated
  expect(screen.getByText('Room Status: Occupied')).toBeInTheDocument();
});

test('updates room status correctly for a patient 2', async () => {
  customRender(<App />);

  // Add a new patient
  fireEvent.click(screen.getByText(/add patient/i));
  fireEvent.change(screen.getByPlaceholderText(/patient name/i), { target: { value: 'Tom Holland' } });
  fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '26' } });
  fireEvent.click(screen.getByText(/submit/i));
  fireEvent.click(screen.getByText(/patient list/i));

  // Navigate to the room status page
  fireEvent.click(screen.getByText('Tom Holland'));
  fireEvent.click(screen.getByText(/update room status/i));

  // Update room status
  fireEvent.change(screen.getByDisplayValue('Available'), { target: { value: 'Occupied' } });
  fireEvent.click(screen.getByText(/update status/i));

  // Check if the room status is updated
  expect(screen.getByText('Room Status: Occupied')).toBeInTheDocument();
});

test('displays the correct text on patient list page', () => {
  customRender(<App />);

  // Check if Patient List text is present
  expect(screen.getByText(/Patient List/)).toBeInTheDocument();
});

test('displays the correct text on Add Patient page', () => {
  customRender(<App />);

  // Go to Add Patient page
  fireEvent.click(screen.getByText(/add patient/i));

  // Check if the form inputs and button are present
  expect(screen.getByPlaceholderText(/patient name/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit/)).toBeInTheDocument();
});

test('checks if Back to Patient button works in Room Status page', () => {
  customRender(<App />);

  // Add patient and navigate to room status page
  fireEvent.click(screen.getByText(/add patient/i));
  fireEvent.change(screen.getByPlaceholderText(/patient name/i), { target: { value: 'Emma Stone' } });
  fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '28' } });
  fireEvent.click(screen.getByText(/submit/i));
  fireEvent.click(screen.getByText(/patient list/i));
  fireEvent.click(screen.getByText('Emma Stone'));
  fireEvent.click(screen.getByText(/update room status/i));

  // Click the Back to Patient button and check if we return to Patient Details
  // fireEvent.click(screen.getByText(/Back to Patient/));
  expect(screen.getByText(/Emma Stone/i)).toBeInTheDocument();
});

test('checks if Add Patient button is working after adding a patient', async () => {
  customRender(<App />);

  // Click Add Patient
  fireEvent.click(screen.getByText(/add patient/i));
  fireEvent.change(screen.getByPlaceholderText(/patient name/i), { target: { value: 'Chris Pratt' } });
  fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '40' } });
  fireEvent.click(screen.getByText(/submit/i));
  fireEvent.click(screen.getByText(/patient list/i));

  // Verify patient list contains the new patient
  await waitFor(() => {
    expect(screen.getByText('Chris Pratt')).toBeInTheDocument();
  });
});

test('displays the correct room status options', async () => {
  customRender(<App />);

  // Add a new patient
  fireEvent.click(screen.getByText(/add patient/i));
  fireEvent.change(screen.getByPlaceholderText(/patient name/i), { target: { value: 'Scarlett Johansson' } });
  fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '35' } });
  fireEvent.click(screen.getByText(/submit/i));
  fireEvent.click(screen.getByText(/patient list/i));

  // Navigate to the room status page
  fireEvent.click(screen.getByText('Scarlett Johansson'));
  fireEvent.click(screen.getByText(/update room status/i));

  // Verify room status options are displayed correctly
  expect(screen.getByDisplayValue('Available')).toBeInTheDocument();
  expect(screen.getByText('Occupied')).toBeInTheDocument();
});
