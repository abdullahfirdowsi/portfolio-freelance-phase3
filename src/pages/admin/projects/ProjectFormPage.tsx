import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../utils/api';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';

const ProjectFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    techStack: [''],
    price: '',
    image: '',
    features: ['']
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      fetchProject(id);
    }
  }, [id, isEditing]);

  const fetchProject = async (projectId: string) => {
    try {
      const response = await api.getProjects();
      if (response.success) {
        const project = response.data?.find((p: any) => p._id === projectId);
        if (project) {
          setFormData({
            title: project.title || '',
            category: project.category || '',
            description: project.description || '',
            techStack: project.techStack || [''],
            price: project.price || '',
            image: project.image || '',
            features: project.features || ['']
          });
        }
      }
    } catch (err) {
      setError('Failed to fetch project data');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleArrayChange = (index: number, value: string, field: 'techStack' | 'features') => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const addArrayItem = (field: 'techStack' | 'features') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (index: number, field: 'techStack' | 'features') => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await api.uploadImage(file);
      if (response.success) {
        setFormData({
          ...formData,
          image: response.data.imageUrl
        });
      } else {
        alert(response.error || 'Failed to upload image');
      }
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Filter out empty strings from arrays
    const cleanedData = {
      ...formData,
      techStack: formData.techStack.filter(tech => tech.trim() !== ''),
      features: formData.features.filter(feature => feature.trim() !== '')
    };

    try {
      const response = isEditing
        ? await api.updateProject(id!, cleanedData)
        : await api.createProject(cleanedData);

      if (response.success) {
        navigate('/admin/projects');
      } else {
        setError(response.error || 'Failed to save project');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/admin/projects')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing ? 'Update project information' : 'Create a new project for your portfolio'}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="IoT">IoT</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe your project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., ₹10,000"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Image *
          </label>
          <div className="space-y-4">
            {formData.image && (
              <div className="relative inline-block">
                <img
                  src={formData.image}
                  alt="Project preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center space-x-2 transition-colors"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Click to upload image</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack *
          </label>
          <div className="space-y-2">
            {formData.techStack.map((tech, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'techStack')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., React, Node.js"
                />
                {formData.techStack.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'techStack')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('techStack')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add Technology
            </button>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Features *
          </label>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Real-time data processing"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'features')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('features')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add Feature
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEditing ? 'Update Project' : 'Create Project'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectFormPage;