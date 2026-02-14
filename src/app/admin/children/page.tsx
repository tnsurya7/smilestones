'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildren, addChild, updateChild, deleteChild, getDoctors, Child } from '@/lib/neon/database';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Search,
  X,
  User,
  Phone,
  Calendar,
  FileText,
  Users,
  Activity
} from 'lucide-react';

// Extended Child type with doctor name
type ChildWithDoctor = Child & {
  assigned_doctor_name?: string;
};

export default function ChildrenPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<ChildWithDoctor[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    diagnosis: '',
    parent_name: '',
    phone: '',
    assigned_doctor_id: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load children and doctors from database
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      await loadChildren();
      const doctorsData = await getDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadChildren = async () => {
    try {
      const data = await getChildren();
      const doctorsData = await getDoctors();
      
      // Add doctor names to children
      const childrenWithDoctors: ChildWithDoctor[] = data.map(child => ({
        ...child,
        assigned_doctor_name: child.assigned_doctor_id 
          ? doctorsData.find(d => d.id === child.assigned_doctor_id)?.name 
          : undefined
      }));
      
      setChildren(childrenWithDoctors);
    } catch (error) {
      console.error('Error loading children:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingChild) {
        // Update existing child
        await updateChild(editingChild.id, {
          name: formData.name,
          age: parseInt(formData.age),
          diagnosis: formData.diagnosis,
          parent_name: formData.parent_name,
          phone: formData.phone,
          assigned_doctor_id: formData.assigned_doctor_id || null,
        });
      } else {
        // Add new child
        await addChild({
          name: formData.name,
          age: parseInt(formData.age),
          diagnosis: formData.diagnosis,
          parent_name: formData.parent_name,
          phone: formData.phone,
          assigned_doctor_id: formData.assigned_doctor_id || null,
        });
      }
      
      await loadChildren();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving child:', error);
      alert('Error saving child. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      diagnosis: '',
      parent_name: '',
      phone: '',
      assigned_doctor_id: '',
    });
    setEditingChild(null);
  };

  const handleEdit = (child: Child) => {
    setEditingChild(child);
    setFormData({
      name: child.name,
      age: child.age.toString(),
      diagnosis: child.diagnosis,
      parent_name: child.parent_name,
      phone: child.phone,
      assigned_doctor_id: child.assigned_doctor_id || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this child profile?')) {
      try {
        await deleteChild(id);
        await loadChildren();
      } catch (error) {
        console.error('Error deleting child:', error);
        alert('Error deleting child. Please try again.');
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

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.parent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="Children Management" />
        
        {/* Add Child Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Child
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search children..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Children Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredChildren.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-500 text-base sm:text-lg">No children found</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">
                {searchQuery ? 'Try a different search term' : 'Add your first child profile to get started'}
              </p>
            </div>
          ) : (
            filteredChildren.map((child) => (
              <div
                key={child.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">{child.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{child.age} years old</p>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={() => handleEdit(child)}
                      className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(child.id)}
                      className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Diagnosis:</span>
                    <span className="font-medium text-gray-900 truncate">{child.diagnosis}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Parent:</span>
                    <span className="font-medium text-gray-900 truncate">{child.parent_name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">{child.phone}</span>
                  </div>

                  {child.assigned_doctor_name && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium text-gray-900 truncate">{child.assigned_doctor_name}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Added:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(child.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3 sm:mt-4">
                  <button
                    onClick={() => router.push(`/admin/sessions?child_id=${child.id}`)}
                    className="flex-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-xs sm:text-sm"
                  >
                    Sessions
                  </button>
                  <button
                    onClick={() => router.push(`/admin/emr/${child.id}`)}
                    className="flex-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    EMR
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingChild ? 'Edit Child Profile' : 'Add New Child'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Child's Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                  min="0"
                  max="18"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Diagnosis
                </label>
                <input
                  type="text"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Autism Spectrum Disorder"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  value={formData.parent_name}
                  onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 9445051166"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assign to Doctor (Optional)
                </label>
                <select
                  value={formData.assigned_doctor_id}
                  onChange={(e) => setFormData({ ...formData, assigned_doctor_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No assignment</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.role === 'super_admin' ? 'Super Admin' : 'Sub Doctor'})
                    </option>
                  ))}
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
                  {editingChild ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
