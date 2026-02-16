'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getStats } from '@/lib/api-client';
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp,
  UserPlus,
  ClipboardList,
  Download
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalChildren: 0,
    totalDoctors: 1,
    sessionsToday: 0,
    totalSessions: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load stats from database
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const statsCards = [
    {
      title: 'Total Children',
      value: stats.totalChildren.toString(),
      icon: Users,
      iconColor: 'text-white',
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Doctors',
      value: stats.totalDoctors.toString(),
      icon: UserPlus,
      iconColor: 'text-white',
      bgGradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Sessions Today',
      value: stats.sessionsToday.toString(),
      icon: Calendar,
      iconColor: 'text-white',
      bgGradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions.toString(),
      icon: ClipboardList,
      iconColor: 'text-white',
      bgGradient: 'from-orange-500 to-orange-600',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Doctors',
      description: 'Add, edit, or remove doctor accounts',
      icon: Users,
      href: '/admin/doctors',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Manage Children',
      description: 'View and manage child profiles',
      icon: UserPlus,
      href: '/admin/children',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'ASD Case Sheet',
      description: 'Comprehensive assessment forms',
      icon: FileText,
      href: '/admin/assessments',
      gradient: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'View Sessions',
      description: 'Review therapy session reports',
      icon: Calendar,
      href: '/admin/sessions',
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Appointments',
      description: 'Online appointment system',
      icon: Calendar,
      href: '/admin/appointments',
      gradient: 'from-cyan-500 to-cyan-600',
    },
    {
      title: 'Therapy Registration',
      description: 'Register new therapy clients',
      icon: UserPlus,
      href: '/admin/therapy-registration',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Parents Appointments',
      description: 'View parents bookings',
      icon: Calendar,
      href: '/admin/parent-appointments',
      gradient: 'from-teal-500 to-teal-600',
    },
    {
      title: 'Parents Registrations',
      description: 'View therapy registrations',
      icon: UserPlus,
      href: '/admin/parent-registrations',
      gradient: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Parents Updates',
      description: 'Motivational messages & updates',
      icon: FileText,
      href: '/admin/parent-updates',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Export Reports',
      description: 'Download PDF reports',
      icon: Download,
      href: '/admin/reports',
      gradient: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Here's what's happening with your clinic today
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-sm sm:text-base"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.bgGradient} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                </div>
                <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => action.href && router.push(action.href)}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all text-left"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${action.gradient} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                    {action.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {action.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Recent Activity
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm">
              View All
            </button>
          </div>
          <div className="text-center py-8 sm:py-12">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">No recent activity</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              Activity will appear here once you start managing children and sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
