'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor, Doctor } from '@/lib/api-client';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Search,
  X,
  Mail,
  Lock,
  User,
  Shield
} from 'lucide-react';

export default function DoctorsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'sub_doctor' as 'super_admin' | 'sub_doctor',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load doctors from database
    if (user) {
      loadDoctors();
    }
  }, [user]);

  const loadDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingDoctor) {
        // Update existing doctor
        const updates: Partial<Doctor> = {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          role: formData.role,
        };
        if (formData.password) {
          updates.password = formData.password;
        }
        await updateDoctor(editingDoctor.id, updates);
      } else {
        // Add new doctor
        await addDoctor({
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          role: formData.role,
        });
      }
      
      await loadDoctors();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert('Error saving doctor. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      username: '',
      password: '',
      role: 'sub_doctor',
    });
    setEditingDoctor(null);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      username: doctor.username,
      password: '',
      role: doctor.role,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor(id);
        await loadDoctors();
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Error deleting doctor. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="Doctors Management" />
        
        {/* Add Doctor Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Doctor
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Doctors List */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Name</th>
                  <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">Username</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                      <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                      <p className="text-gray-500 text-base sm:text-lg">No doctors found</p>
                      <p className="text-gray-400 text-xs sm:text-sm mt-2">
                        {searchQuery ? 'Try a different search term' : 'Add your first doctor to get started'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                            {doctor.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900 text-sm sm:text-base">{doctor.name}</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-gray-600 text-sm">{doctor.email}</td>
                      <td className="hidden lg:table-cell px-6 py-4 text-gray-600 text-sm">{doctor.username}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                          doctor.role === 'super_admin' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          <Shield className="w-3 h-3" />
                          <span className="hidden sm:inline">{doctor.role === 'super_admin' ? 'Super Admin' : 'Sub Doctor'}</span>
                          <span className="sm:hidden">{doctor.role === 'super_admin' ? 'Admin' : 'Doctor'}</span>
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEdit(doctor)}
                            className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(doctor.id)}
                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dr. John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="doctor@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="johndoe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password {editingDoctor && '(leave blank to keep current)'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required={!editingDoctor}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'super_admin' | 'sub_doctor' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="sub_doctor">Sub Doctor</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  {editingDoctor ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
