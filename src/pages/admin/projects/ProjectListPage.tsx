import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/api';
import { showSuccess, showError } from '../../../utils/toast';
import { Plus, Edit, Trash2, Eye, ExternalLink } from 'lucide-react';
import SearchInput from '../../../components/SearchInput';
import Pagination from '../../../components/Pagination';

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const itemsPerPage = 9;

  useEffect(() => {
    fetchProjects();
  }, [currentPage, searchQuery]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.getProjects({
        search: searchQuery,
        page: currentPage,
        limit: itemsPerPage
      });
      if (response.success) {
        setProjects(response.data?.projects || []);
        setTotalProjects(response.data?.total || 0);
      } else {
        setError(response.error || 'Failed to fetch projects');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await api.deleteProject(id);
      if (response.success) {
        setProjects(projects.filter((project: any) => project._id !== id));
        setTotalProjects(prev => prev - 1);
        showSuccess('Project deleted successfully');
      } else {
        showError(response.error || 'Failed to delete project');
      }
    } catch (err) {
      showError('Network error occurred');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProjects / itemsPerPage);

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
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage your portfolio projects</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Project</span>
        </Link>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search projects by title or category..."
          className="w-full max-w-md"
        />
        <div className="text-sm text-gray-600 ml-4">
          {totalProjects} project{totalProjects !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `No projects match "${searchQuery}". Try a different search term.`
                : 'Get started by creating your first project'
              }
            </p>
            {!searchQuery && (
            <Link
              to="/admin/projects/new"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Project</span>
            </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary-600">
                    {project.price}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span>{project.views || 0}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/admin/projects/edit/${project._id}`}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id, project.title)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && projects.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalProjects}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default ProjectListPage;