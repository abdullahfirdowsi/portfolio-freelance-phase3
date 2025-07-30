import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/api';
import { showSuccess, showError } from '../../../utils/toast';
import { Eye, Trash2, Mail, Phone, Calendar, Filter } from 'lucide-react';
import SearchInput from '../../../components/SearchInput';
import Pagination from '../../../components/Pagination';

const ContactListPage = () => {
  const [contacts, setContacts] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  
  const itemsPerPage = 10;

  useEffect(() => {
    fetchContacts();
  }, [currentPage, searchQuery, filter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.getContacts({
        search: searchQuery,
        page: currentPage,
        limit: itemsPerPage,
        status: filter
      });
      if (response.success) {
        setContacts(response.data?.contacts || []);
        setTotalContacts(response.data?.total || 0);
      } else {
        setError(response.error || 'Failed to fetch contacts');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the message from "${name}"?`)) {
      return;
    }

    try {
      const response = await api.deleteContact(id);
      if (response.success) {
        setContacts(contacts.filter((contact: any) => contact._id !== id));
        setTotalContacts(prev => prev - 1);
        showSuccess('Contact deleted successfully');
      } else {
        showError(response.error || 'Failed to delete contact');
      }
    } catch (err) {
      showError('Network error occurred');
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
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-primary-600';
      case 'medium': return 'text-primary-600';
      case 'low': return 'text-secondary-600';
      default: return 'text-gray-600';
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalContacts / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-2">Manage inquiries from potential clients</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search contacts by name, email, or message..."
          className="w-full max-w-md"
        />
        <div className="text-sm text-gray-600 ml-4">
          {totalContacts} contact{totalContacts !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Contacts List */}
      {!loading && contacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery 
                ? 'No contacts found' 
                : filter === 'all' 
                  ? 'No messages yet' 
                  : `No ${filter} messages`
              }
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No contacts match "${searchQuery}". Try a different search term.`
                : filter === 'all' 
                  ? 'Contact messages will appear here when clients reach out'
                  : `No messages with ${filter} status found`
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact: any) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="text-sm text-gray-500 flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {contact.projectType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getPriorityColor(contact.priority)}`}>
                        {contact.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/contacts/${contact._id}`}
                          className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(contact._id, contact.name)}
                          className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && contacts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalContacts}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default ContactListPage;