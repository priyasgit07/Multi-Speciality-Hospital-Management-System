-- =====================================================================
-- MediCare Multi-Speciality Hospital Management System Database Schema
-- Compatible with MySQL 8.0+ and 9.x
-- =====================================================================

CREATE DATABASE IF NOT EXISTS hospital_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hospital_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    avatar VARCHAR(500),
    specialization VARCHAR(255),
    department_id BIGINT,
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- 2. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    head VARCHAR(255),
    beds INT DEFAULT 0,
    occupancy INT DEFAULT 0
) ENGINE=InnoDB;

-- Department Specialties Table
CREATE TABLE IF NOT EXISTS department_specialties (
    department_id BIGINT NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    department VARCHAR(255),
    department_id BIGINT,
    available BOOLEAN DEFAULT TRUE,
    phone VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    INDEX idx_doctor_department (department)
) ENGINE=InnoDB;

-- Doctor Schedules Table
CREATE TABLE IF NOT EXISTS doctor_schedules (
    doctor_id BIGINT NOT NULL,
    day_of_week VARCHAR(50) NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    age INT,
    gender VARCHAR(50),
    date_of_birth VARCHAR(50),
    phone VARCHAR(50),
    email VARCHAR(255),
    address VARCHAR(500),
    blood_group VARCHAR(20),
    emergency_contact VARCHAR(255),
    medical_history TEXT,
    last_visit VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active',
    insurance VARCHAR(255),
    INDEX idx_patient_name (name),
    INDEX idx_patient_id (patient_id)
) ENGINE=InnoDB;

-- 5. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    date VARCHAR(50) NOT NULL,
    time VARCHAR(50) NOT NULL,
    type VARCHAR(50) DEFAULT 'Consultation',
    status VARCHAR(50) DEFAULT 'Scheduled',
    reason VARCHAR(500),
    notes TEXT,
    INDEX idx_doctor_datetime (doctor_id, date, time),
    INDEX idx_patient_appointments (patient_id)
) ENGINE=InnoDB;

-- 6. Medical Records Table
CREATE TABLE IF NOT EXISTS medical_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT,
    date VARCHAR(50) NOT NULL,
    diagnosis VARCHAR(500) NOT NULL,
    treatment TEXT,
    prescription TEXT,
    visit_notes TEXT,
    department VARCHAR(255),
    INDEX idx_patient_records (patient_id)
) ENGINE=InnoDB;
