import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { 
  FolderOpen, 
  DollarSign, 
  MessageSquare, 
  TrendingUp,
  Eye,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalProjects: 0,
      totalPricingTiers: 0,
      totalContacts: 0,
      totalProjectViews: 0,
      recentContactsCount: 0,
      contactGrowth: 0
    },
    contactsByType: [],
    contactsByStatus: [],
    contactsByPriority: [],
    projectsByCategory: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.getDashboardStats();
        
        if (response.success) {
          setDashboardData({
            ...response.data,
            loading: false,
            error: null
          });
        } else {
          setDashboardData(prev => ({
            ...prev,
            loading: false,
            error: response.error || 'Failed to fetch dashboard data'
          }));
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          error: 'Network error occurred'
        }));
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Add New Project',
      description: 'Create a new project for your portfolio',
      href: '/admin/projects/new',
      icon: FolderOpen,
      color: 'bg-primary-600'
    },
    {
      title: 'Add Pricing Tier',
      description: 'Create a new pricing package',
      href: '/admin/pricing/new',
      icon: DollarSign,
      color: 'bg-secondary-600'
    },
    {
      title: 'View Contacts',
      description: 'Check new contact messages',
      href: '/admin/contacts',
      icon: MessageSquare,
      color: 'bg-primary-600'
    }
  ];

  const statCards = [
    {
      title: 'Total Projects',
      value: dashboardData.overview.totalProjects,
      icon: FolderOpen,
      color: 'text-primary-600 bg-primary-50',
      change: null
    },
    {
      title: 'Pricing Tiers',
      value: dashboardData.overview.totalPricingTiers,
      icon: DollarSign,
      color: 'text-secondary-600 bg-secondary-50',
      change: null
    },
    {
      title: 'Contact Messages',
      value: dashboardData.overview.totalContacts,
      icon: MessageSquare,
      color: 'text-primary-600 bg-primary-50',
      change: dashboardData.overview.contactGrowth
    },
    {
      title: 'Portfolio Views',
      value: dashboardData.overview.totalProjectViews,
      icon: Eye,
      color: 'text-secondary-600 bg-secondary-50',
      change: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4 text-primary-600" />;
      case 'read': return <Eye className="h-4 w-4 text-gray-600" />;
      case 'replied': return <CheckCircle className="h-4 w-4 text-secondary-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-primary-600" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-secondary-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-primary-600 bg-primary-50';
      case 'medium': return 'text-primary-600 bg-primary-50';
      case 'low': return 'text-secondary-600 bg-secondary-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (dashboardData.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      {/* Error Message */}
      {dashboardData.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{dashboardData.error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    {stat.change !== null && (
                      <span className={`text-sm font-medium ${
                        stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change >= 0 ? '+' : ''}{stat.change}%
                      </span>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.href}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Messages by Type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="h-5 w-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Messages by Type</h2>
          </div>
          <div className="space-y-3">
            {dashboardData.contactsByType.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900 capitalize">{item.type}</span>
                <span className="text-lg font-bold text-primary-600">{item.count}</span>
              </div>
            ))}
            {dashboardData.contactsByType.length === 0 && (
              <p className="text-gray-500 text-center py-4">No contact messages yet</p>
            )}
          </div>
        </div>

        {/* Contact Messages by Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Messages by Status</h2>
          </div>
          <div className="space-y-3">
            {dashboardData.contactsByStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <span className="font-medium text-gray-900 capitalize">{item.status}</span>
                </div>
                <span className="text-lg font-bold text-primary-600">{item.count}</span>
              </div>
            ))}
            {dashboardData.contactsByStatus.length === 0 && (
              <p className="text-gray-500 text-center py-4">No contact messages yet</p>
            )}
          </div>
        </div>

        {/* Project Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FolderOpen className="h-5 w-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900">Projects by Category</h2>
          </div>
          <div className="space-y-3">
            {dashboardData.projectsByCategory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{item.category}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{item.count} projects</span>
                  <span className="text-sm text-gray-600">{item.totalViews} views</span>
                </div>
              </div>
            ))}
            {dashboardData.projectsByCategory.length === 0 && (
              <p className="text-gray-500 text-center py-4">No projects yet</p>
            )}
          </div>
        </div>

        {/* Contact Priority Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Priority Distribution</h2>
          </div>
          <div className="space-y-3">
            {dashboardData.contactsByPriority.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
                <span className="text-lg font-bold text-primary-600">{item.count}</span>
              </div>
            ))}
            {dashboardData.contactsByPriority.length === 0 && (
              <p className="text-gray-500 text-center py-4">No contact messages yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity Summary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">{dashboardData.overview.recentContactsCount}</div>
            <div className="text-sm text-gray-600">New contacts (7 days)</div>
          </div>
          <div className="text-center p-4 bg-secondary-50 rounded-lg">
            <div className="text-2xl font-bold text-secondary-600">{dashboardData.overview.totalProjectViews}</div>
            <div className="text-sm text-gray-600">Total project views</div>
          </div>
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-2xl font-bold text-primary-600">
                {dashboardData.overview.contactGrowth >= 0 ? '+' : ''}{dashboardData.overview.contactGrowth}%
              </span>
              {dashboardData.overview.contactGrowth >= 0 ? (
                <TrendingUp className="h-5 w-5 text-secondary-600" />
              ) : (
                <TrendingUp className="h-5 w-5 text-red-600 transform rotate-180" />
              )}
            </div>
            <div className="text-sm text-gray-600">Contact growth (30 days)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;