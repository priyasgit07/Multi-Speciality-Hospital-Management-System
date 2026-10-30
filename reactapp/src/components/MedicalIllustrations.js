import React from 'react';

// Dashboard Header Illustration
export const DashboardHeaderIllustration = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#EBF4FF"/>
    <path d="M20 24h24v16H20z" fill="#DBEAFE"/>
    <path d="M22 26h20v2H22zm0 4h20v2H22zm0 4h16v2H22zm0 4h12v2H22z" fill="#3B82F6"/>
    <circle cx="48" cy="20" r="8" fill="#10B981"/>
    <path d="M44 20h8M48 16v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <rect x="16" y="44" width="32" height="8" rx="4" fill="#F3F4F6"/>
    <rect x="18" y="46" width="8" height="4" rx="2" fill="#6B7280"/>
    <rect x="28" y="46" width="12" height="4" rx="2" fill="#3B82F6"/>
    <rect x="42" y="46" width="4" height="4" rx="2" fill="#EF4444"/>
  </svg>
);

// Empty Appointments Illustration
export const EmptyAppointmentsIllustration = ({ className = "w-24 h-24" }) => (
  <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="16" width="48" height="56" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>
    <rect x="32" y="8" width="8" height="16" rx="4" fill="#CBD5E1"/>
    <rect x="56" y="8" width="8" height="16" rx="4" fill="#CBD5E1"/>
    <line x1="32" y1="28" x2="64" y2="28" stroke="#E2E8F0" strokeWidth="1"/>
    <rect x="28" y="32" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <rect x="36" y="32" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <rect x="44" y="32" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <rect x="52" y="32" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <rect x="60" y="32" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <rect x="28" y="40" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <rect x="36" y="40" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <rect x="44" y="40" width="4" height="4" rx="1" fill="#DBEAFE"/>
    <rect x="52" y="40" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <rect x="60" y="40" width="4" height="4" rx="1" fill="#F1F5F9"/>
    <circle cx="48" cy="58" r="12" fill="#F1F5F9"/>
    <path d="M42 58h12M48 52v12" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Empty Patients Illustration
export const EmptyPatientsIllustration = ({ className = "w-24 h-24" }) => (
  <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="48" cy="32" r="12" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="2"/>
    <path d="M28 72c0-11.046 8.954-20 20-20s20 8.954 20 20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>
    <rect x="20" y="76" width="56" height="12" rx="6" fill="#F1F5F9"/>
    <circle cx="32" cy="82" r="2" fill="#CBD5E1"/>
    <circle cx="48" cy="82" r="2" fill="#CBD5E1"/>
    <circle cx="64" cy="82" r="2" fill="#CBD5E1"/>
    <rect x="40" y="16" width="16" height="8" rx="4" fill="#DBEAFE"/>
    <path d="M44 20h8M48 16v8" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Empty Data Illustration
export const EmptyDataIllustration = ({ className = "w-24 h-24" }) => (
  <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="24" width="64" height="48" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>
    <rect x="20" y="28" width="56" height="8" rx="2" fill="#F1F5F9"/>
    <rect x="20" y="40" width="32" height="4" rx="2" fill="#E2E8F0"/>
    <rect x="20" y="48" width="24" height="4" rx="2" fill="#E2E8F0"/>
    <rect x="20" y="56" width="40" height="4" rx="2" fill="#E2E8F0"/>
    <rect x="20" y="64" width="28" height="4" rx="2" fill="#E2E8F0"/>
    <circle cx="64" cy="52" r="8" fill="#F1F5F9"/>
    <path d="M60 52h8M64 48v8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Medical Dashboard Icon
export const MedicalDashboardIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#3B82F6"/>
    <path d="M12 8h8v16h-8z" fill="white" fillOpacity="0.9"/>
    <path d="M14 10h4v2h-4zm0 3h4v2h-4zm0 3h3v2h-3zm0 3h2v2h-2z" fill="#3B82F6"/>
    <circle cx="24" cy="12" r="4" fill="#10B981"/>
    <path d="M22 12h4M24 10v4" stroke="white" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);