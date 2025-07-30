import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../utils/api';
import { showSuccess, showError } from '../../../utils/toast';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  User,
  Trash2,
  ExternalLink,
  Save,
  Plus
} from 'lucide-react';

const ContactDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

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
        showSuccess('Contact deleted successfully');
      } else {
        showError(response.error || 'Failed to delete contact');
      }
    } catch (err) {
      showError('Network error occurred');
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!contact) return;

    try {
      setUpdating(true);
      const response = await api.updateContactStatus(contact._id, newStatus);
      if (response.success) {
        setContact({ ...contact, status: newStatus });
        showSuccess('Contact status updated successfully');
      } else {
        showError(response.error || 'Failed to update status');
      }
    } catch (err) {
      showError('Network error occurred');
    } finally {
      setUpdating(false);
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    if (!contact) return;

    try {
      setUpdating(true);
      const response = await api.updateContactPriority(contact._id, newPriority);
      if (response.success) {
        setContact({ ...contact, priority: newPriority });
        showSuccess('Contact priority updated successfully');
      } else {
        showError(response.error || 'Failed to update priority');
      }
    } catch (err) {
      showError('Network error occurred');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async () => {
    if (!contact || !newNote.trim()) return;

    try {
      setAddingNote(true);
      const response = await api.addContactNote(contact._id, newNote.trim());
      if (response.success) {
        const updatedNotes = [...(contact.notes || []), {
          content: newNote.trim(),
          addedAt: new Date().toISOString(),
          addedBy: 'admin'
        }];
        setContact({ ...contact, notes: updatedNotes });
        setNewNote('');
        showSuccess('Note added successfully');
      } else {
        showError(response.error || 'Failed to add note');
      }
    } catch (err) {
      showError('Network error occurred');
    } finally {
      setAddingNote(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-primary-100 text-primary-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'replied': return 'bg-secondary-100 text-secondary-800';
      case 'in-progress': return 'bg-primary-100 text-primary-800';
      case 'completed': return 'bg-secondary-100 text-secondary-800';
      default: return 'bg-gray-100 text-gray-800';
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
                <div className="mt-1">
                  <select
                    value={contact.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updating}
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full border-0 focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    style={{
                      backgroundColor: getStatusColor(contact.status).includes('primary') ? '#eff6ff' : 
                                     getStatusColor(contact.status).includes('gray') ? '#f3f4f6' :
                                     getStatusColor(contact.status).includes('secondary') ? '#f0fdf4' : '#f3f4f6',
                      color: getStatusColor(contact.status).includes('primary') ? '#1d4ed8' : 
                             getStatusColor(contact.status).includes('gray') ? '#374151' :
                             getStatusColor(contact.status).includes('secondary') ? '#15803d' : '#374151'
                    }}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Priority</p>
                <div className="mt-1">
                  <select
                    value={contact.priority}
                    onChange={(e) => handlePriorityChange(e.target.value)}
                    disabled={updating}
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full border-0 focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    style={{
                      backgroundColor: getPriorityColor(contact.priority).includes('red') ? '#fef2f2' : 
                                     getPriorityColor(contact.priority).includes('primary') ? '#eff6ff' :
                                     getPriorityColor(contact.priority).includes('secondary') ? '#f0fdf4' : '#f9fafb',
                      color: getPriorityColor(contact.priority).includes('red') ? '#dc2626' : 
                             getPriorityColor(contact.priority).includes('primary') ? '#1d4ed8' :
                             getPriorityColor(contact.priority).includes('secondary') ? '#15803d' : '#6b7280'
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
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
                className="bg-secondary-50 hover:bg-secondary-100 text-secondary-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Internal Notes</h2>
            
            {/* Add Note Form */}
            <div className="mb-6">
              <div className="flex space-x-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add an internal note..."
                  rows={3}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim() || addingNote}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingNote ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>Add Note</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Existing Notes */}
            {contact.notes && contact.notes.length > 0 ? (
              <div className="space-y-3">
                {contact.notes.map((note: any, index: number) => (
                  <div key={index} className="bg-primary-50 border-l-4 border-primary-400 p-4 rounded-r-lg">
                    <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Added by {note.addedBy} on {new Date(note.addedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No notes added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;