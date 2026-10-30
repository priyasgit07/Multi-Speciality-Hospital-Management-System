import React from 'react';

// Premium Friendly Doctor for Login Page
export const FriendlyDoctorLogin = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="doctorSkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="doctorCoat" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
      <linearGradient id="doctorShirt" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.1"/>
      </filter>
    </defs>

    {/* Background Circle */}
    <circle cx="200" cy="250" r="180" fill="#f0f9ff" opacity="0.6" />
    <circle cx="200" cy="250" r="150" fill="#e0f2fe" opacity="0.4" />

    {/* Doctor Body */}
    <g transform="translate(200, 280)" filter="url(#softShadow)">
      {/* Lab Coat */}
      <path d="M-60 80 L-60 180 Q-60 190 -50 190 L50 190 Q60 190 60 180 L60 80 Q60 70 50 70 L40 70 L40 50 Q40 40 30 40 L-30 40 Q-40 40 -40 50 L-40 70 L-50 70 Q-60 70 -60 80 Z" fill="url(#doctorCoat)" stroke="#e2e8f0" strokeWidth="1" />

      {/* Shirt underneath */}
      <rect x="-25" y="50" width="50" height="80" rx="8" fill="url(#doctorShirt)" />

      {/* Lab Coat Collar */}
      <path d="M-40 50 Q-35 45 -25 50 L-25 70 L-40 70 Z" fill="url(#doctorCoat)" />
      <path d="M40 50 Q35 45 25 50 L25 70 L40 70 Z" fill="url(#doctorCoat)" />

      {/* Coat Buttons */}
      <circle cx="0" cy="80" r="3" fill="#cbd5e1" />
      <circle cx="0" cy="100" r="3" fill="#cbd5e1" />
      <circle cx="0" cy="120" r="3" fill="#cbd5e1" />

      {/* Pocket */}
      <rect x="-35" y="90" width="20" height="15" rx="3" fill="none" stroke="#e2e8f0" strokeWidth="1" />

      {/* Arms */}
      <ellipse cx="-45" cy="90" rx="12" ry="35" fill="url(#doctorCoat)" />
      <ellipse cx="45" cy="90" rx="12" ry="35" fill="url(#doctorCoat)" />

      {/* Hands */}
      <circle cx="-45" cy="125" r="8" fill="url(#doctorSkin)" />
      <circle cx="45" cy="125" r="8" fill="url(#doctorSkin)" />
    </g>

    {/* Doctor Head */}
    <g transform="translate(200, 180)">
      {/* Face */}
      <circle cx="0" cy="0" r="35" fill="url(#doctorSkin)" filter="url(#softShadow)" />

      {/* Hair */}
      <path d="M-30 -25 Q-35 -35 -25 -40 Q0 -45 25 -40 Q35 -35 30 -25 Q25 -30 0 -32 Q-25 -30 -30 -25 Z" fill="#374151" />

      {/* Eyes */}
      <ellipse cx="-12" cy="-5" rx="4" ry="6" fill="#ffffff" />
      <ellipse cx="12" cy="-5" rx="4" ry="6" fill="#ffffff" />
      <circle cx="-12" cy="-3" r="2.5" fill="#1f2937" />
      <circle cx="12" cy="-3" r="2.5" fill="#1f2937" />
      <circle cx="-11" cy="-4" r="1" fill="#ffffff" />
      <circle cx="13" cy="-4" r="1" fill="#ffffff" />

      {/* Eyebrows */}
      <path d="M-16 -12 Q-12 -14 -8 -12" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 -12 Q12 -14 16 -12" stroke="#374151" strokeWidth="2" strokeLinecap="round" />

      {/* Nose */}
      <ellipse cx="0" cy="2" rx="2" ry="3" fill="#f59e0b" opacity="0.3" />

      {/* Smile */}
      <path d="M-8 8 Q0 15 8 8" stroke="#374151" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Cheeks (cute blush) */}
      <circle cx="-20" cy="5" r="4" fill="#f87171" opacity="0.2" />
      <circle cx="20" cy="5" r="4" fill="#f87171" opacity="0.2" />
    </g>

    {/* Stethoscope */}
    <g transform="translate(200, 220)">
      <path d="M-25 20 Q-35 25 -30 35 Q-25 45 -15 40 Q-5 35 -10 25 Q-15 15 -25 20" stroke="#374151" strokeWidth="3" fill="none" />
      <path d="M25 20 Q35 25 30 35 Q25 45 15 40 Q5 35 10 25 Q15 15 25 20" stroke="#374151" strokeWidth="3" fill="none" />
      <path d="M-15 40 Q0 50 15 40" stroke="#374151" strokeWidth="3" fill="none" />
      <circle cx="0" cy="50" r="6" fill="#374151" />
      <circle cx="0" cy="50" r="3" fill="#6b7280" />
    </g>

    {/* Clipboard in hand */}
    <g transform="translate(245, 320)">
      <rect x="0" y="0" width="25" height="35" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" filter="url(#softShadow)" />
      <rect x="8" y="-5" width="9" height="8" rx="2" fill="#cbd5e1" />
      <line x1="4" y1="10" x2="21" y2="10" stroke="#94a3b8" strokeWidth="1" />
      <line x1="4" y1="15" x2="18" y2="15" stroke="#94a3b8" strokeWidth="1" />
      <line x1="4" y1="20" x2="21" y2="20" stroke="#94a3b8" strokeWidth="1" />
      <line x1="4" y1="25" x2="15" y2="25" stroke="#94a3b8" strokeWidth="1" />
    </g>

    {/* Floating Medical Icons */}
    <g opacity="0.3">
      {/* Heart */}
      <path d="M80 150 C80 140, 90 135, 95 145 C100 135, 110 140, 110 150 C110 160, 95 175, 95 175 C95 175, 80 160, 80 150 Z" fill="#ef4444" />

      {/* Plus */}
      <rect x="320" y="180" width="12" height="3" rx="1" fill="#22c55e" />
      <rect x="324" y="176" width="3" height="12" rx="1" fill="#22c55e" />

      {/* Pills */}
      <ellipse cx="90" cy="350" rx="6" ry="12" fill="#3b82f6" />
      <ellipse cx="90" cy="350" rx="6" ry="6" fill="#ffffff" opacity="0.7" />
    </g>
  </svg>
);

// Premium Admin Doctor for Admin Dashboard
export const PremiumAdminDoctor = ({ className = "w-full h-full" }) => (
  <div className={`${className} relative flex items-center justify-center`}>
    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="doctorSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="doctorCoat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
        <linearGradient id="softBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Soft background elements */}
      <ellipse cx="320" cy="80" rx="60" ry="40" fill="url(#softBg)" />
      <ellipse cx="100" cy="200" rx="80" ry="50" fill="url(#softBg)" />

      {/* Doctor figure */}
      <g transform="translate(200, 150)">
        {/* Body - white coat */}
        <path d="M-30 20 L-30 80 Q-30 85 -25 85 L25 85 Q30 85 30 80 L30 20 Q30 15 25 15 L20 15 L20 0 Q20 -5 15 -5 L-15 -5 Q-20 -5 -20 0 L-20 15 L-25 15 Q-30 15 -30 20 Z" fill="url(#doctorCoat)" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Shirt underneath */}
        <rect x="-15" y="0" width="30" height="40" rx="4" fill="#0ea5e9" opacity="0.8" />

        {/* Coat collar */}
        <path d="M-20 0 Q-15 -3 -10 0 L-10 15 L-20 15 Z" fill="url(#doctorCoat)" />
        <path d="M20 0 Q15 -3 10 0 L10 15 L20 15 Z" fill="url(#doctorCoat)" />

        {/* Coat buttons */}
        <circle cx="0" cy="25" r="1.5" fill="#cbd5e1" />
        <circle cx="0" cy="35" r="1.5" fill="#cbd5e1" />
        <circle cx="0" cy="45" r="1.5" fill="#cbd5e1" />

        {/* Arms */}
        <ellipse cx="-25" cy="35" rx="6" ry="20" fill="url(#doctorCoat)" />
        <ellipse cx="25" cy="35" rx="6" ry="20" fill="url(#doctorCoat)" />

        {/* Hands */}
        <circle cx="-25" cy="55" r="4" fill="url(#doctorSkin)" />
        <circle cx="25" cy="55" r="4" fill="url(#doctorSkin)" />
      </g>

      {/* Doctor head */}
      <g transform="translate(200, 120)">
        {/* Face */}
        <circle cx="0" cy="0" r="18" fill="url(#doctorSkin)" />

        {/* Hair */}
        <path d="M-15 -12 Q-18 -20 -12 -22 Q0 -24 12 -22 Q18 -20 15 -12 Q12 -16 0 -17 Q-12 -16 -15 -12 Z" fill="#374151" />

        {/* Eyes */}
        <ellipse cx="-6" cy="-3" rx="2" ry="3" fill="#ffffff" />
        <ellipse cx="6" cy="-3" rx="2" ry="3" fill="#ffffff" />
        <circle cx="-6" cy="-2" r="1.5" fill="#1f2937" />
        <circle cx="6" cy="-2" r="1.5" fill="#1f2937" />
        <circle cx="-5.5" cy="-2.5" r="0.5" fill="#ffffff" />
        <circle cx="6.5" cy="-2.5" r="0.5" fill="#ffffff" />

        {/* Eyebrows */}
        <path d="M-9 -8 Q-6 -9 -3 -8" stroke="#374151" strokeWidth="1" strokeLinecap="round" />
        <path d="M3 -8 Q6 -9 9 -8" stroke="#374151" strokeWidth="1" strokeLinecap="round" />

        {/* Smile */}
        <path d="M-4 4 Q0 8 4 4" stroke="#374151" strokeWidth="1" strokeLinecap="round" fill="none" />
      </g>

      {/* Stethoscope */}
      <g transform="translate(200, 140)">
        <path d="M-12 8 Q-16 12 -12 16 Q-8 12 -12 8" stroke="#374151" strokeWidth="1.5" fill="none" />
        <path d="M12 8 Q16 12 12 16 Q8 12 12 8" stroke="#374151" strokeWidth="1.5" fill="none" />
        <path d="M-8 16 Q0 20 8 16" stroke="#374151" strokeWidth="1.5" fill="none" />
        <circle cx="0" cy="20" r="3" fill="#374151" />
      </g>

      {/* Tablet in hand */}
      <g transform="translate(225, 180)">
        <rect x="0" y="0" width="15" height="20" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="2" y="2" width="11" height="8" rx="1" fill="#0ea5e9" opacity="0.3" />
        <line x1="3" y1="12" x2="12" y2="12" stroke="#94a3b8" strokeWidth="0.5" />
        <line x1="3" y1="14" x2="10" y2="14" stroke="#94a3b8" strokeWidth="0.5" />
        <line x1="3" y1="16" x2="12" y2="16" stroke="#94a3b8" strokeWidth="0.5" />
      </g>

      {/* Subtle medical icons */}
      <g opacity="0.15">
        <circle cx="80" cy="100" r="8" fill="#0ea5e9" />
        <rect x="76" y="96" width="8" height="1.5" fill="#ffffff" />
        <rect x="78.5" y="94" width="3" height="6" fill="#ffffff" />

        <ellipse cx="320" cy="180" rx="4" ry="8" fill="#22c55e" />
        <ellipse cx="320" cy="180" rx="4" ry="4" fill="#ffffff" opacity="0.7" />
      </g>
    </svg>
  </div>
);

// Premium Professional Doctor for Doctor Dashboard
export const PremiumDoctorPortrait = ({ className = "w-full h-full" }) => (
  <div className={`${className} relative flex items-center justify-center`}>
    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="doctorSkinPortrait" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="doctorCoatPortrait" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
        <linearGradient id="softBgPortrait" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Soft background elements */}
      <ellipse cx="320" cy="80" rx="60" ry="40" fill="url(#softBgPortrait)" />
      <ellipse cx="100" cy="200" rx="80" ry="50" fill="url(#softBgPortrait)" />

      {/* Doctor figure */}
      <g transform="translate(200, 150)">
        {/* Body - white coat */}
        <path d="M-30 20 L-30 80 Q-30 85 -25 85 L25 85 Q30 85 30 80 L30 20 Q30 15 25 15 L20 15 L20 0 Q20 -5 15 -5 L-15 -5 Q-20 -5 -20 0 L-20 15 L-25 15 Q-30 15 -30 20 Z" fill="url(#doctorCoatPortrait)" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Shirt underneath */}
        <rect x="-15" y="0" width="30" height="40" rx="4" fill="#22c55e" opacity="0.8" />

        {/* Coat collar */}
        <path d="M-20 0 Q-15 -3 -10 0 L-10 15 L-20 15 Z" fill="url(#doctorCoatPortrait)" />
        <path d="M20 0 Q15 -3 10 0 L10 15 L20 15 Z" fill="url(#doctorCoatPortrait)" />

        {/* Coat buttons */}
        <circle cx="0" cy="25" r="1.5" fill="#cbd5e1" />
        <circle cx="0" cy="35" r="1.5" fill="#cbd5e1" />
        <circle cx="0" cy="45" r="1.5" fill="#cbd5e1" />

        {/* Arms */}
        <ellipse cx="-25" cy="35" rx="6" ry="20" fill="url(#doctorCoatPortrait)" />
        <ellipse cx="25" cy="35" rx="6" ry="20" fill="url(#doctorCoatPortrait)" />

        {/* Hands */}
        <circle cx="-25" cy="55" r="4" fill="url(#doctorSkinPortrait)" />
        <circle cx="25" cy="55" r="4" fill="url(#doctorSkinPortrait)" />
      </g>

      {/* Doctor head */}
      <g transform="translate(200, 120)">
        {/* Face */}
        <circle cx="0" cy="0" r="18" fill="url(#doctorSkinPortrait)" />

        {/* Hair */}
        <path d="M-15 -12 Q-18 -20 -12 -22 Q0 -24 12 -22 Q18 -20 15 -12 Q12 -16 0 -17 Q-12 -16 -15 -12 Z" fill="#374151" />

        {/* Eyes */}
        <ellipse cx="-6" cy="-3" rx="2" ry="3" fill="#ffffff" />
        <ellipse cx="6" cy="-3" rx="2" ry="3" fill="#ffffff" />
        <circle cx="-6" cy="-2" r="1.5" fill="#1f2937" />
        <circle cx="6" cy="-2" r="1.5" fill="#1f2937" />
        <circle cx="-5.5" cy="-2.5" r="0.5" fill="#ffffff" />
        <circle cx="6.5" cy="-2.5" r="0.5" fill="#ffffff" />

        {/* Eyebrows */}
        <path d="M-9 -8 Q-6 -9 -3 -8" stroke="#374151" strokeWidth="1" strokeLinecap="round" />
        <path d="M3 -8 Q6 -9 9 -8" stroke="#374151" strokeWidth="1" strokeLinecap="round" />

        {/* Smile */}
        <path d="M-4 4 Q0 8 4 4" stroke="#374151" strokeWidth="1" strokeLinecap="round" fill="none" />
      </g>

      {/* Stethoscope */}
      <g transform="translate(200, 140)">
        <path d="M-12 8 Q-16 12 -12 16 Q-8 12 -12 8" stroke="#374151" strokeWidth="1.5" fill="none" />
        <path d="M12 8 Q16 12 12 16 Q8 12 12 8" stroke="#374151" strokeWidth="1.5" fill="none" />
        <path d="M-8 16 Q0 20 8 16" stroke="#374151" strokeWidth="1.5" fill="none" />
        <circle cx="0" cy="20" r="3" fill="#374151" />
      </g>

      {/* Medical chart in hand */}
      <g transform="translate(225, 180)">
        <rect x="0" y="0" width="15" height="20" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="2" y="2" width="11" height="8" rx="1" fill="#22c55e" opacity="0.3" />
        <line x1="3" y1="12" x2="12" y2="12" stroke="#94a3b8" strokeWidth="0.5" />
        <line x1="3" y1="14" x2="10" y2="14" stroke="#94a3b8" strokeWidth="0.5" />
        <line x1="3" y1="16" x2="12" y2="16" stroke="#94a3b8" strokeWidth="0.5" />
      </g>

      {/* Subtle medical icons */}
      <g opacity="0.15">
        <circle cx="80" cy="100" r="8" fill="#22c55e" />
        <rect x="76" y="96" width="8" height="1.5" fill="#ffffff" />
        <rect x="78.5" y="94" width="3" height="6" fill="#ffffff" />

        <ellipse cx="320" cy="180" rx="4" ry="8" fill="#0ea5e9" />
        <ellipse cx="320" cy="180" rx="4" ry="4" fill="#ffffff" opacity="0.7" />
      </g>
    </svg>
  </div>
);

// Premium Doctor Avatar for Dashboard
export const DoctorAvatar = ({ className = "w-16 h-16", name = "Doctor" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="avatarSkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="avatarCoat" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
      <filter id="avatarShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.1"/>
      </filter>
    </defs>

    {/* Background Circle */}
    <circle cx="50" cy="50" r="48" fill="#f0f9ff" stroke="#bfdbfe" strokeWidth="2" />

    {/* Doctor Body */}
    <g transform="translate(50, 65)">
      {/* Lab Coat */}
      <path d="M-20 10 L-20 35 Q-20 40 -15 40 L15 40 Q20 40 20 35 L20 10 Q20 5 15 5 L10 5 L10 -5 Q10 -10 5 -10 L-5 -10 Q-10 -10 -10 -5 L-10 5 L-15 5 Q-20 5 -20 10 Z" fill="url(#avatarCoat)" stroke="#e2e8f0" strokeWidth="0.5" />

      {/* Shirt */}
      <rect x="-8" y="-5" width="16" height="25" rx="3" fill="#0ea5e9" />

      {/* Collar */}
      <path d="M-10 -5 Q-8 -8 -5 -5 L-5 5 L-10 5 Z" fill="url(#avatarCoat)" />
      <path d="M10 -5 Q8 -8 5 -5 L5 5 L10 5 Z" fill="url(#avatarCoat)" />
    </g>

    {/* Doctor Head */}
    <g transform="translate(50, 40)" filter="url(#avatarShadow)">
      {/* Face */}
      <circle cx="0" cy="0" r="18" fill="url(#avatarSkin)" />

      {/* Hair */}
      <path d="M-15 -12 Q-18 -20 -12 -22 Q0 -24 12 -22 Q18 -20 15 -12 Q12 -16 0 -17 Q-12 -16 -15 -12 Z" fill="#374151" />

      {/* Eyes */}
      <ellipse cx="-6" cy="-3" rx="2" ry="3" fill="#ffffff" />
      <ellipse cx="6" cy="-3" rx="2" ry="3" fill="#ffffff" />
      <circle cx="-6" cy="-2" r="1.5" fill="#1f2937" />
      <circle cx="6" cy="-2" r="1.5" fill="#1f2937" />
      <circle cx="-5.5" cy="-2.5" r="0.5" fill="#ffffff" />
      <circle cx="6.5" cy="-2.5" r="0.5" fill="#ffffff" />

      {/* Smile */}
      <path d="M-4 4 Q0 8 4 4" stroke="#374151" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* Cheeks */}
      <circle cx="-10" cy="2" r="2" fill="#f87171" opacity="0.2" />
      <circle cx="10" cy="2" r="2" fill="#f87171" opacity="0.2" />
    </g>

    {/* Stethoscope */}
    <g transform="translate(50, 55)">
      <path d="M-8 5 Q-12 8 -8 12 Q-4 8 -8 5" stroke="#374151" strokeWidth="1.5" fill="none" />
      <path d="M8 5 Q12 8 8 12 Q4 8 8 5" stroke="#374151" strokeWidth="1.5" fill="none" />
      <path d="M-4 12 Q0 15 4 12" stroke="#374151" strokeWidth="1.5" fill="none" />
      <circle cx="0" cy="15" r="2" fill="#374151" />
    </g>
  </svg>
);

// Professional Doctor Photo Component
export const ProfessionalDoctorPhoto = ({ className = "w-full h-full" }) => (
  <div className={`${className} relative overflow-hidden rounded-3xl bg-gradient-to-br from-medical-50 to-medical-100 shadow-2xl`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
    <div className="relative h-full flex items-center justify-center p-8">
      <div className="w-full max-w-sm mx-auto">
        {/* Professional Doctor Portrait */}
        <div className="relative">
          {/* Background Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-medical-200/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-success-200/20 rounded-full blur-2xl"></div>

          {/* Main Doctor Figure */}
          <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-medical-100/50">
            {/* Doctor Head & Face */}
            <div className="flex flex-col items-center space-y-4">
              {/* Professional Headshot */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full overflow-hidden shadow-lg border-4 border-white">
                {/* Face */}
                <div className="absolute inset-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full">
                  {/* Eyes */}
                  <div className="absolute top-6 left-6 w-3 h-3 bg-neutral-800 rounded-full"></div>
                  <div className="absolute top-6 right-6 w-3 h-3 bg-neutral-800 rounded-full"></div>
                  {/* Nose */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-amber-300 rounded-full"></div>
                  {/* Smile */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-neutral-700 rounded-full"></div>
                </div>
                {/* Hair */}
                <div className="absolute -top-1 left-2 right-2 h-8 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-t-full"></div>
              </div>

              {/* White Coat */}
              <div className="relative w-40 h-48 bg-white rounded-lg shadow-md border border-neutral-200">
                {/* Coat Collar */}
                <div className="absolute top-0 left-4 right-4 h-6 bg-gradient-to-b from-neutral-100 to-white rounded-t-lg border-b border-neutral-200"></div>

                {/* Stethoscope */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  {/* Stethoscope Tube */}
                  <div className="w-1 h-16 bg-gradient-to-b from-neutral-600 to-neutral-700 rounded-full mx-auto"></div>
                  {/* Stethoscope Head */}
                  <div className="w-4 h-4 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full mx-auto -mt-1 border-2 border-neutral-600"></div>
                </div>

                {/* Coat Buttons */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 space-y-3">
                  <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
                </div>

                {/* Pocket */}
                <div className="absolute top-16 left-6 w-8 h-6 bg-neutral-50 rounded border border-neutral-200">
                  {/* Pen */}
                  <div className="absolute top-1 left-1 w-1 h-4 bg-medical-600 rounded-full"></div>
                </div>

                {/* Arms */}
                <div className="absolute top-20 -left-6 w-12 h-20 bg-white rounded-lg transform -rotate-12 shadow-sm"></div>
                <div className="absolute top-20 -right-6 w-12 h-20 bg-white rounded-lg transform rotate-12 shadow-sm"></div>
              </div>

              {/* Professional Badge */}
              <div className="bg-gradient-to-r from-medical-600 to-medical-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Dr. Healthcare Professional
              </div>
            </div>
          </div>

          {/* Medical Equipment Background */}
          <div className="absolute top-4 right-8 w-8 h-8 bg-success-200 rounded-lg opacity-60 transform rotate-12">
            {/* Medical Cross */}
            <div className="absolute inset-2 flex items-center justify-center">
              <div className="w-1 h-4 bg-success-600 rounded-full"></div>
              <div className="absolute w-4 h-1 bg-success-600 rounded-full"></div>
            </div>
          </div>

          <div className="absolute bottom-8 left-4 w-6 h-6 bg-warning-200 rounded-full opacity-50">
            <div className="absolute inset-1 bg-warning-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);