import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/api';
import { showSuccess, showError } from '../../../utils/toast';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import SearchInput from '../../../components/SearchInput';
import Pagination from '../../../components/Pagination';

const PricingListPage = () => {
  const [pricing, setPricing] = useState([]);
  const [totalPricing, setTotalPricing] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const itemsPerPage = 6;

  useEffect(() => {
    fetchPricing();
  }, [currentPage, searchQuery]);

  const fetchPricing = async () => {
    try {
      setLoading(true);
      const response = await api.getPricing({
        search: searchQuery,
        page: currentPage,
        limit: itemsPerPage
      });
      if (response.success) {
        setPricing(response.data?.pricing || []);
        setTotalPricing(response.data?.total || 0);
      } else {
        setError(response.error || 'Failed to fetch pricing');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const response = await api.deletePricing(id);
      if (response.success) {
        setPricing(pricing.filter((tier: any) => tier._id !== id));
        setTotalPricing(prev => prev - 1);
        showSuccess('Pricing tier deleted successfully');
      } else {
        showError(response.error || 'Failed to delete pricing tier');
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

  const totalPages = Math.ceil(totalPricing / itemsPerPage);

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
          <h1 className="text-3xl font-bold text-gray-900">Pricing</h1>
          <p className="text-gray-600 mt-2">Manage your pricing tiers</p>
        </div>
        <Link
          to="/admin/pricing/new"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Pricing Tier</span>
        </Link>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search pricing tiers by name or description..."
          className="w-full max-w-md"
        />
        <div className="text-sm text-gray-600 ml-4">
          {totalPricing} pricing tier{totalPricing !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Pricing Grid */}
      {!loading && pricing.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No pricing tiers found' : 'No pricing tiers yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `No pricing tiers match "${searchQuery}". Try a different search term.`
                : 'Get started by creating your first pricing tier'
              }
            </p>
            {!searchQuery && (
            <Link
              to="/admin/pricing/new"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Pricing Tier</span>
            </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricing.map((tier: any) => (
            <div
              key={tier._id}
              className={`bg-white rounded-lg shadow-md border-2 ${
                tier.popular ? 'border-primary-500 relative' : 'border-gray-200'
              } transition-all duration-300 hover:shadow-lg`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Popular</span>
                  </span>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="text-2xl font-bold text-primary-600 mb-4">{tier.price}</div>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {tier.features?.slice(0, 3).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                  {tier.features?.length > 3 && (
                    <li className="text-sm text-gray-500">
                      +{tier.features.length - 3} more features
                    </li>
                  )}
                </ul>

                <div className="flex space-x-2">
                  <Link
                    to={`/admin/pricing/edit/${tier._id}`}
                    className="flex-1 bg-primary-50 hover:bg-primary-100 text-primary-600 px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(tier._id, tier.name)}
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
      {!loading && pricing.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalPricing}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default PricingListPage;