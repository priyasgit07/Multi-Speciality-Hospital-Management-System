import React from 'react';

// Premium Healthcare Illustration Components
export const HospitalDashboardHero = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Elements */}
    <defs>
      <linearGradient id="hospitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0f9ff" />
        <stop offset="100%" stopColor="#e0f2fe" />
      </linearGradient>
      <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect width="800" height="400" fill="url(#hospitalGradient)" />

    {/* Hospital Building */}
    <rect x="500" y="120" width="280" height="200" rx="12" fill="url(#buildingGradient)" opacity="0.9" />
    <rect x="520" y="140" width="40" height="60" rx="4" fill="#ffffff" opacity="0.8" />
    <rect x="580" y="140" width="40" height="60" rx="4" fill="#ffffff" opacity="0.8" />
    <rect x="640" y="140" width="40" height="60" rx="4" fill="#ffffff" opacity="0.8" />
    <rect x="700" y="140" width="40" height="60" rx="4" fill="#ffffff" opacity="0.8" />

    {/* Medical Cross */}
    <rect x="620" y="240" width="40" height="8" rx="4" fill="#ffffff" />
    <rect x="636" y="224" width="8" height="40" rx="4" fill="#ffffff" />

    {/* Doctor Figure */}
    <g transform="translate(200, 180)">
      {/* Body */}
      <ellipse cx="40" cy="120" rx="35" ry="45" fill="#ffffff" />
      <rect x="20" y="100" width="40" height="80" rx="20" fill="#0ea5e9" />

      {/* Head */}
      <circle cx="40" cy="60" r="25" fill="#fbbf24" />

      {/* Stethoscope */}
      <path d="M25 85 Q15 95 25 105 Q35 95 25 85" stroke="#374151" strokeWidth="3" fill="none" />
      <circle cx="25" cy="105" r="4" fill="#374151" />

      {/* Arms */}
      <ellipse cx="15" cy="110" rx="8" ry="25" fill="#fbbf24" />
      <ellipse cx="65" cy="110" rx="8" ry="25" fill="#fbbf24" />

      {/* Clipboard */}
      <rect x="70" y="100" width="20" height="30" rx="2" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" />
      <line x1="75" y1="110" x2="85" y2="110" stroke="#6b7280" strokeWidth="1" />
      <line x1="75" y1="115" x2="85" y2="115" stroke="#6b7280" strokeWidth="1" />
      <line x1="75" y1="120" x2="85" y2="120" stroke="#6b7280" strokeWidth="1" />
    </g>

    {/* Floating Medical Icons */}
    <g opacity="0.6">
      {/* Heart */}
      <path d="M100 150 C100 140, 110 135, 115 145 C120 135, 130 140, 130 150 C130 160, 115 175, 115 175 C115 175, 100 160, 100 150 Z" fill="#ef4444" />

      {/* Pills */}
      <ellipse cx="150" cy="100" rx="8" ry="15" fill="#10b981" />
      <ellipse cx="150" cy="100" rx="8" ry="15" fill="#ffffff" opacity="0.5" />

      {/* Medical Chart */}
      <rect x="680" y="80" width="30" height="25" rx="3" fill="#ffffff" stroke="#d1d5db" strokeWidth="1" />
      <line x1="685" y1="88" x2="705" y2="88" stroke="#6b7280" strokeWidth="1" />
      <line x1="685" y1="93" x2="700" y2="93" stroke="#6b7280" strokeWidth="1" />
      <line x1="685" y1="98" x2="705" y2="98" stroke="#6b7280" strokeWidth="1" />
    </g>

    {/* Data Visualization Elements */}
    <g transform="translate(50, 280)">
      {/* Chart Bars */}
      <rect x="0" y="40" width="15" height="40" rx="2" fill="#0ea5e9" opacity="0.7" />
      <rect x="20" y="20" width="15" height="60" rx="2" fill="#10b981" opacity="0.7" />
      <rect x="40" y="30" width="15" height="50" rx="2" fill="#f59e0b" opacity="0.7" />
      <rect x="60" y="10" width="15" height="70" rx="2" fill="#ef4444" opacity="0.7" />

      {/* Chart Lines */}
      <path d="M100 70 Q120 50 140 60 Q160 40 180 55" stroke="#0ea5e9" strokeWidth="3" fill="none" opacity="0.8" />
      <circle cx="100" cy="70" r="4" fill="#0ea5e9" />
      <circle cx="140" cy="60" r="4" fill="#0ea5e9" />
      <circle cx="180" cy="55" r="4" fill="#0ea5e9" />
    </g>
  </svg>
);

export const EmptyAppointments = ({ className = "w-32 h-32" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dbeafe" />
        <stop offset="100%" stopColor="#bfdbfe" />
      </linearGradient>
    </defs>

    {/* Calendar Base */}
    <rect x="40" y="60" width="120" height="100" rx="8" fill="url(#calendarGradient)" stroke="#93c5fd" strokeWidth="2" />

    {/* Calendar Header */}
    <rect x="40" y="60" width="120" height="25" rx="8" fill="#3b82f6" />
    <rect x="45" y="85" width="110" height="2" fill="#e5e7eb" />

    {/* Calendar Rings */}
    <rect x="65" y="45" width="6" height="25" rx="3" fill="#6b7280" />
    <rect x="129" y="45" width="6" height="25" rx="3" fill="#6b7280" />

    {/* Empty Calendar Grid */}
    <g opacity="0.4">
      <rect x="50" y="95" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="68" y="95" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="86" y="95" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="104" y="95" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="122" y="95" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="140" y="95" width="12" height="12" rx="2" fill="#d1d5db" />

      <rect x="50" y="113" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="68" y="113" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="86" y="113" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="104" y="113" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="122" y="113" width="12" height="12" rx="2" fill="#d1d5db" />
      <rect x="140" y="113" width="12" height="12" rx="2" fill="#d1d5db" />
    </g>

    {/* Clock Icon */}
    <circle cx="100" cy="40" r="15" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
    <line x1="100" y1="30" x2="100" y2="40" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
    <line x1="100" y1="40" x2="107" y2="47" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const EmptyPatients = ({ className = "w-32 h-32" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="patientGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dcfce7" />
        <stop offset="100%" stopColor="#bbf7d0" />
      </linearGradient>
    </defs>

    {/* Medical Folder */}
    <rect x="50" y="80" width="100" height="80" rx="8" fill="url(#patientGradient)" stroke="#86efac" strokeWidth="2" />
    <rect x="50" y="80" width="100" height="20" rx="8" fill="#22c55e" />

    {/* Folder Tab */}
    <rect x="70" y="65" width="30" height="15" rx="4" fill="#22c55e" />

    {/* Patient Silhouette */}
    <g transform="translate(100, 50)" opacity="0.6">
      <circle cx="0" cy="0" r="12" fill="#16a34a" />
      <path d="M-15 25 Q-15 15 0 15 Q15 15 15 25 L15 35 L-15 35 Z" fill="#16a34a" />
    </g>

    {/* Medical Cross */}
    <rect x="95" y="120" width="10" height="3" rx="1" fill="#ffffff" />
    <rect x="98" y="117" width="3" height="10" rx="1" fill="#ffffff" />

    {/* Document Lines */}
    <line x1="65" y1="140" x2="135" y2="140" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
    <line x1="65" y1="150" x2="120" y2="150" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const EmptyReports = ({ className = "w-32 h-32" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="reportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="100%" stopColor="#fde68a" />
      </linearGradient>
    </defs>

    {/* Report Document */}
    <rect x="60" y="40" width="80" height="120" rx="8" fill="url(#reportGradient)" stroke="#fbbf24" strokeWidth="2" />

    {/* Chart Area */}
    <rect x="70" y="80" width="60" height="40" rx="4" fill="#ffffff" opacity="0.8" />

    {/* Bar Chart */}
    <rect x="75" y="105" width="6" height="10" rx="1" fill="#f59e0b" />
    <rect x="85" y="100" width="6" height="15" rx="1" fill="#f59e0b" />
    <rect x="95" y="95" width="6" height="20" rx="1" fill="#f59e0b" />
    <rect x="105" y="110" width="6" height="5" rx="1" fill="#f59e0b" />
    <rect x="115" y="90" width="6" height="25" rx="1" fill="#f59e0b" />

    {/* Document Header */}
    <line x1="70" y1="55" x2="130" y2="55" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    <line x1="70" y1="65" x2="110" y2="65" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />

    {/* Document Lines */}
    <line x1="70" y1="135" x2="130" y2="135" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
    <line x1="70" y1="145" x2="120" y2="145" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />

    {/* Magnifying Glass */}
    <circle cx="150" cy="60" r="12" fill="none" stroke="#f59e0b" strokeWidth="3" />
    <line x1="159" y1="69" x2="170" y2="80" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const DoctorConsultation = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="consultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0fdf4" />
        <stop offset="100%" stopColor="#dcfce7" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect width="400" height="300" fill="url(#consultGradient)" />

    {/* Doctor */}
    <g transform="translate(80, 120)">
      {/* Body */}
      <rect x="15" y="60" width="30" height="50" rx="15" fill="#22c55e" />
      {/* Head */}
      <circle cx="30" cy="40" r="18" fill="#fbbf24" />
      {/* Stethoscope */}
      <path d="M15 65 Q10 70 15 75 Q20 70 15 65" stroke="#374151" strokeWidth="2" fill="none" />
      <circle cx="15" cy="75" r="3" fill="#374151" />
      {/* Arms */}
      <ellipse cx="5" cy="75" rx="6" ry="18" fill="#fbbf24" />
      <ellipse cx="55" cy="75" rx="6" ry="18" fill="#fbbf24" />
    </g>

    {/* Patient */}
    <g transform="translate(250, 130)">
      {/* Body */}
      <rect x="15" y="50" width="30" height="45" rx="15" fill="#e5e7eb" />
      {/* Head */}
      <circle cx="30" cy="35" r="16" fill="#fbbf24" />
      {/* Arms */}
      <ellipse cx="5" cy="65" rx="5" ry="15" fill="#fbbf24" />
      <ellipse cx="55" cy="65" rx="5" ry="15" fill="#fbbf24" />
    </g>

    {/* Medical Equipment */}
    <g transform="translate(150, 80)">
      {/* Monitor */}
      <rect x="0" y="0" width="60" height="40" rx="4" fill="#374151" />
      <rect x="5" y="5" width="50" height="30" rx="2" fill="#10b981" />
      {/* Heart Rate Line */}
      <path d="M10 20 L15 20 L20 10 L25 30 L30 15 L35 25 L40 20 L45 20" stroke="#ffffff" strokeWidth="2" fill="none" />
      {/* Stand */}
      <rect x="25" y="40" width="10" height="30" rx="2" fill="#6b7280" />
      <rect x="15" y="65" width="30" height="5" rx="2" fill="#6b7280" />
    </g>

    {/* Medical Chart */}
    <g transform="translate(320, 80)">
      <rect x="0" y="0" width="25" height="35" rx="3" fill="#ffffff" stroke="#d1d5db" strokeWidth="1" />
      <line x1="3" y1="8" x2="22" y2="8" stroke="#6b7280" strokeWidth="1" />
      <line x1="3" y1="13" x2="18" y2="13" stroke="#6b7280" strokeWidth="1" />
      <line x1="3" y1="18" x2="22" y2="18" stroke="#6b7280" strokeWidth="1" />
      <line x1="3" y1="23" x2="15" y2="23" stroke="#6b7280" strokeWidth="1" />
    </g>

    {/* Communication Lines */}
    <path d="M140 160 Q180 140 220 160" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
  </svg>
);

export const MedicalTeam = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eff6ff" />
        <stop offset="100%" stopColor="#dbeafe" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect width="500" height="300" fill="url(#teamGradient)" />

    {/* Doctor 1 */}
    <g transform="translate(100, 150)">
      <rect x="15" y="60" width="30" height="50" rx="15" fill="#0ea5e9" />
      <circle cx="30" cy="40" r="18" fill="#fbbf24" />
      <path d="M15 65 Q10 70 15 75 Q20 70 15 65" stroke="#374151" strokeWidth="2" fill="none" />
      <ellipse cx="5" cy="75" rx="6" ry="18" fill="#fbbf24" />
      <ellipse cx="55" cy="75" rx="6" ry="18" fill="#fbbf24" />
    </g>

    {/* Nurse */}
    <g transform="translate(200, 160)">
      <rect x="15" y="50" width="30" height="45" rx="15" fill="#22c55e" />
      <circle cx="30" cy="35" r="16" fill="#fbbf24" />
      <rect x="25" y="25" width="10" height="8" rx="2" fill="#ffffff" />
      <ellipse cx="5" cy="65" rx="5" ry="15" fill="#fbbf24" />
      <ellipse cx="55" cy="65" rx="5" ry="15" fill="#fbbf24" />
    </g>

    {/* Doctor 2 */}
    <g transform="translate(300, 155)">
      <rect x="15" y="55" width="30" height="48" rx="15" fill="#8b5cf6" />
      <circle cx="30" cy="38" r="17" fill="#fbbf24" />
      <path d="M15 62 Q10 67 15 72 Q20 67 15 62" stroke="#374151" strokeWidth="2" fill="none" />
      <ellipse cx="5" cy="72" rx="5" ry="16" fill="#fbbf24" />
      <ellipse cx="55" cy="72" rx="5" ry="16" fill="#fbbf24" />
    </g>

    {/* Medical Equipment in Background */}
    <g opacity="0.3">
      <rect x="50" y="80" width="40" height="25" rx="3" fill="#6b7280" />
      <rect x="420" y="90" width="35" height="30" rx="3" fill="#6b7280" />
    </g>

    {/* Collaboration Lines */}
    <path d="M130 180 Q165 160 200 180" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3,3" opacity="0.5" />
    <path d="M230 180 Q265 160 300 180" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" opacity="0.5" />
  </svg>
);