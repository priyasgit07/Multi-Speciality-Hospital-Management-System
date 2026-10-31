import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';

const DepartmentList = () => {
  const { departments, doctors } = useHospital();
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const getDepartmentDoctors = (departmentName) => {
    return doctors.filter(doctor => doctor.department === departmentName);
  };

  const getDepartmentStats = (dept) => {
    const deptDoctors = getDepartmentDoctors(dept.name);
    const availableDoctors = deptDoctors.filter(d => d.available).length;
    const occupancyRate = dept.beds > 0 ? ((dept.occupancy / dept.beds) * 100).toFixed(1) : 'N/A';

    return {
      totalDoctors: deptDoctors.length,
      availableDoctors,
      occupancyRate
    };
  };

  return (
    <div className="w-full" style={{ width: '100%', maxWidth: '100%', margin: 0 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Management</h1>
        <p className="text-gray-600">Overview of all hospital departments and specialties</p>
      </div>

      {/* Department Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {departments.map((dept) => {
          const stats = getDepartmentStats(dept);
          return (
            <div
              key={dept.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedDepartment(dept)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{dept.name}</h3>
                  <p className="text-sm text-gray-600">Head: {dept.head}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bed Occupancy</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dept.beds > 0 ? `${dept.occupancy}/${dept.beds} (${stats.occupancyRate}%)` : 'No beds'}
                  </span>
                </div>

                {dept.beds > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${stats.occupancyRate}%` }}
                    ></div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Doctors</span>
                  <span className="text-sm font-medium text-gray-900">
                    {stats.availableDoctors}/{stats.totalDoctors} Available
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {dept.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium group-hover:translate-x-1 transition-all duration-200">
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Details Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedDepartment.name} Department
              </h2>
              <button
                onClick={() => setSelectedDepartment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Beds</p>
                    <p className="text-xl font-bold text-gray-900">{selectedDepartment.beds}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Occupied</p>
                    <p className="text-xl font-bold text-gray-900">{selectedDepartment.occupancy}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Doctors</p>
                    <p className="text-xl font-bold text-gray-900">
                      {getDepartmentDoctors(selectedDepartment.name).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {selectedDepartment.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Department Doctors */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Doctors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getDepartmentDoctors(selectedDepartment.name).map((doctor) => (
                  <div key={doctor.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">Dr. {doctor.name}</h4>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-500">{doctor.email}</p>
                        <p className="text-sm text-gray-500">{doctor.phone}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doctor.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Schedule:</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.schedule.map((day, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedDepartment(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Department Statistics Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Statistics</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Head</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Beds</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Occupancy</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Doctors</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Specialties</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => {
                const stats = getDepartmentStats(dept);
                return (
                  <tr key={dept.id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{dept.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{dept.head}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{dept.beds || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm">
                      {dept.beds > 0 ? (
                        <div className="flex items-center">
                          <span className="text-gray-900 mr-2">
                            {dept.occupancy}/{dept.beds}
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${stats.occupancyRate}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600 ml-2 text-xs">
                            {stats.occupancyRate}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">No beds</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {stats.availableDoctors}/{stats.totalDoctors}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {dept.specialties.length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;