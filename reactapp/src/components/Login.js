import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
//import { FriendlyDoctorLogin } from './PremiumDoctorIllustrations';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@hospital.com', password: 'admin123', role: 'Administrator' },
    { email: 'doctor@hospital.com', password: 'doctor123', role: 'Doctor' },
    { email: 'receptionist@hospital.com', password: 'reception123', role: 'Receptionist' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-medical-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Premium Doctor Illustration Side */}
        {/* Premium Doctor Illustration Side */}
<div className="hidden lg:flex flex-col items-center justify-center p-8">
  <div className="w-full max-w-md">
    <img
      src="/new.png"
      alt="Hospital"
      className="w-full h-auto"
    />
  </div>

  <div className="text-center mt-6 space-y-3">
    <h2 className="text-2xl font-bold text-gradient">
      Welcome to MediCare
    </h2>

    <p className="text-neutral-600 text-lg leading-relaxed">
      Your trusted partner in healthcare management.
      <br />
      Secure, efficient, and designed for care.
    </p>
  </div>
</div>
        {/* Login Form Side */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-medical-500 to-medical-700 rounded-2xl flex items-center justify-center mb-6 shadow-card hover:shadow-elevated transition-all duration-300">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">MediCare HMS</h1>
            <p className="text-neutral-600 font-medium">Hospital Management System</p>
          </div>

          {/* Login Form */}
          <div className="card-premium p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-critical-50 border border-critical-200 text-critical-700 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                  {error}
                </div>
              )}

              <div>
                <label className="label label-required">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="label label-required">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="input-field pr-12"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg py-3 touch-feedback"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="loading-spinner"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <p className="text-sm font-bold text-neutral-700 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-2 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Demo Access
              </p>
              <div className="space-y-3">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full text-left p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-medical-50 hover:to-medical-100 rounded-xl transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 touch-feedback group"
                    onClick={() => setFormData({ email: account.email, password: account.password })}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-neutral-900 group-hover:text-medical-700 transition-colors duration-300">{account.role}</p>
                        <p className="text-xs text-neutral-500 font-medium">{account.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-medical-600 font-bold group-hover:text-medical-700 transition-colors duration-300">Use Account</span>
                        <svg className="w-4 h-4 text-medical-600 group-hover:text-medical-700 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}