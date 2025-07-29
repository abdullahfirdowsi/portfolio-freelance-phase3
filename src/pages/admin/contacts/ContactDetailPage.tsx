import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../utils/api';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  User,
  Trash2,
  ExternalLink
} from 'lucide-react';

const ContactDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchContact(id);
    }
  }, [id]);

  const fetchContact = async (contactId: string) => {
    try {
      setLoading(true);
      const response = await api.getContact(contactId);
      if (response.success) {
        setContact(response.data);
      } else {
        setError(response.error || 'Failed to fetch contact details');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!contact || !window.confirm(`Are you sure you want to delete the message from "${contact.name}"?`)) {
      return;
    }

    try {
      const response = await api.deleteContact(contact._id);
      if (response.success) {
        navigate('/admin/contacts');
      } else {
        alert(response.error || 'Failed to delete contact');
      }
    } catch (err) {
      alert('Network error occurred');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-800">{error || 'Contact not found'}</p>
          <button
            onClick={() => navigate('/admin/contacts')}
            className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Contacts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/contacts')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Details</h1>
            <p className="text-gray-600 mt-2">Message from {contact.name}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{contact.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-medium text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                  >
                    <span>{contact.email}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {contact.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="font-medium text-gray-900">
                    {new Date(contact.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Project Type</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {contact.projectType}
                </span>
              </div>

              {contact.budget && (
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-medium text-gray-900">{contact.budget}</p>
                </div>
              )}

              {contact.timeline && (
                <div>
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="font-medium text-gray-900">{contact.timeline}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-600">Priority</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getPriorityColor(contact.priority)}`}>
                  {contact.priority}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Message</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {contact.message}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={`mailto:${contact.email}?subject=Re: ${contact.projectType} Project Inquiry`}
                className="bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Reply via Email</span>
              </a>
              
              <a
                href={`https://wa.me/${contact.phone?.replace(/\D/g, '')}?text=Hi%20${contact.name},%20I%20received%20your%20inquiry%20about%20${contact.projectType}%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Notes Section */}
          {contact.notes && contact.notes.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
              <div className="space-y-3">
                {contact.notes.map((note: any, index: number) => (
                  <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-gray-800">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Added by {note.addedBy} on {new Date(note.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;