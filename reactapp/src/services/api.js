import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    // Do not attach token to public auth endpoints
    if (!config.url?.includes('/auth/login') && !config.url?.includes('/auth/register')) {
      const token = localStorage.getItem('hospital_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors and session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const isAuthEndpoint = error.config?.url?.includes('/auth/');

      // If 401 occurs on a protected endpoint (NOT login/register), token is expired/invalid
      if (error.response.status === 401 && !isAuthEndpoint) {
        localStorage.removeItem('hospital_token');
        localStorage.removeItem('hospital_user');
        // Dispatch an event so AuthContext can transition state without hard page reload
        window.dispatchEvent(new Event('hospital_auth_expired'));
      }

      const message = error.response.data?.message || error.response.data?.error || 'A server error occurred';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(new Error('Network error: unable to connect to the server'));
  }
);

// Auth Service
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Patient Service
export const patientService = {
  getPatients: async (search, status) => {
    const params = {};
    if (search) params.search = search;
    if (status && status !== 'All') params.status = status;
    const response = await api.get('/patients', { params });
    return response.data;
  },
  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },
  createPatient: async (patient) => {
    const response = await api.post('/patients', patient);
    return response.data;
  },
  updatePatient: async (id, patient) => {
    const response = await api.put(`/patients/${id}`, patient);
    return response.data;
  },
  deletePatient: async (id) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  }
};

// Doctor Service
export const doctorService = {
  getDoctors: async (department) => {
    const params = department && department !== 'All' ? { department } : {};
    const response = await api.get('/doctors', { params });
    return response.data;
  },
  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },
  updateAvailability: async (id, available) => {
    const response = await api.patch(`/doctors/${id}/availability`, { available });
    return response.data;
  }
};

// Department Service
export const departmentService = {
  getDepartments: async () => {
    const response = await api.get('/departments');
    return response.data;
  },
  getDepartmentById: async (id) => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  }
};

// Appointment Service
export const appointmentService = {
  getAppointments: async (filters = {}) => {
    const response = await api.get('/appointments', { params: filters });
    return response.data;
  },
  getAppointmentById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },
  createAppointment: async (appointment) => {
    const response = await api.post('/appointments', appointment);
    return response.data;
  },
  updateAppointment: async (id, appointment) => {
    const response = await api.put(`/appointments/${id}`, appointment);
    return response.data;
  },
  cancelAppointment: async (id) => {
    const response = await api.patch(`/appointments/${id}/cancel`);
    return response.data;
  },
  deleteAppointment: async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  }
};

// Medical Records Service
export const medicalRecordService = {
  getMedicalRecords: async (patientId) => {
    const params = patientId ? { patientId } : {};
    const response = await api.get('/medical-records', { params });
    return response.data;
  },
  getRecordById: async (id) => {
    const response = await api.get(`/medical-records/${id}`);
    return response.data;
  },
  createMedicalRecord: async (record) => {
    const response = await api.post('/medical-records', record);
    return response.data;
  }
};

// Dashboard Service
export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
};

export default api;
