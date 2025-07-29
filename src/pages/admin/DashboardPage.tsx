import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { 
  FolderOpen, 
  DollarSign, 
  MessageSquare, 
  TrendingUp,
  Users,
  Eye,
  Plus
} from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    projects: 0,
    pricing: 0,
    contacts: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, pricingRes, contactsRes] = await Promise.all([
          api.getProjects(),
          api.getPricing(),
          api.getContacts()
        ]);

        setStats({
          projects: projectsRes.success ? projectsRes.data?.length || 0 : 0,
          pricing: pricingRes.success ? pricingRes.data?.length || 0 : 0,
          contacts: contactsRes.success ? contactsRes.data?.length || 0 : 0,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
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
      color: 'bg-blue-500'
    },
    {
      title: 'Add Pricing Tier',
      description: 'Create a new pricing package',
      href: '/admin/pricing/new',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'View Contacts',
      description: 'Check new contact messages',
      href: '/admin/contacts',
      icon: MessageSquare,
      color: 'bg-purple-500'
    }
  ];

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pricing Tiers',
      value: stats.pricing,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Portfolio Views',
      value: '2.4K',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.loading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
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

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Portfolio views increased by 15%</p>
              <p className="text-xs text-gray-600">Last 7 days</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <MessageSquare className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New contact message received</p>
              <p className="text-xs text-gray-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">3 new project inquiries</p>
              <p className="text-xs text-gray-600">Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;