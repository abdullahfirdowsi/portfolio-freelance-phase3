import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter, Search } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import Cookies from 'js-cookie';
import { api } from '../utils/api';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 9;
  const filters = ['All', 'AI/ML', 'Web Development', 'Data Science', 'IoT', 'Mobile App'];

  // Fetch projects from backend
  useEffect(() => {

    fetchProjects();
  }, [currentPage, searchQuery, activeFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Build search query combining text search and category filter
      let searchTerm = searchQuery;
      if (activeFilter !== 'All' && searchQuery) {
        // If both category filter and search query exist, prioritize search query
        // The backend will handle the search across title, category, and description
        searchTerm = searchQuery;
      } else if (activeFilter !== 'All') {
        // If only category filter exists, use it as search term
        searchTerm = activeFilter;
      }
      
      const response = await api.getProjects({
        search: searchTerm,
        page: currentPage,
        limit: itemsPerPage
      });
      
      if (response.success) {
        const data = response.data;
        setProjects(data.projects || []);
        setTotalProjects(data.total || 0);
        setError(null);
        
        // Increment view count for each project (only once per day per user)
        const projectsArray = data.projects || [];
        projectsArray.forEach(async (project: any) => {
          if (project._id) {
            const cookieName = `project_view_${String(project._id)}`;
            const hasViewed = Cookies.get(cookieName);
            
            // Only increment view if user hasn't viewed this project today
            if (!hasViewed) {
              try {
                await api.incrementProjectView(String(project._id));
                // Set cookie to expire in 1 day
                Cookies.set(cookieName, 'true', { expires: 1 });
              } catch (err) {
                console.error('Failed to increment view for project:', project._id, err);
              }
            }
          }
        });
      } else {
        throw new Error(response.error || 'Failed to fetch projects');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching projects:', err);
      
      // Fallback to sample data if API fails
      const fallbackProjects = [
        {
          _id: 1,
          title: "Amazon E-Commerce Product Quality Analysis",
          category: "AI/ML",
          description: "Interactive website leveraging customer reviews and real-time product data to forecast Amazon product quality using LSTM model.",
          techStack: ["Python", "LSTM", "Sentiment Analysis", "Scraper API", "Render"],
          price: "₹2,000",
          image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Real-time data scraping", "Sentiment analysis", "LSTM prediction", "Interactive dashboard"]
        },
        {
          _id: 2,
          title: "LeafCare - Cassava Plant Disease Detection",
          category: "AI/ML",
          description: "Deep learning approach using CNN and EfficientNetB0 model to classify diseases in cassava leaf images with 96% accuracy.",
          techStack: ["Python", "CNN", "EfficientNetB0", "Streamlit", "Image Processing"],
          price: "₹1,000",
          image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["96% accuracy", "CNN implementation", "Streamlit interface", "Image classification"]
        },
        {
          _id: 3,
          title: "EduSphere - Tutor’s eLearning Platform",
          category: "Web Development",
          description: "An integrated web platform for educators to manage courses, coding, and resources in one place, promoting personalized and effective learning.",
          techStack: ["React.js", "Python", "Django", "JavaScript"],
          price: "₹3,500",
          image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Unified self-learning platform", "Tutor-focused functionality", "Content aggregation", "Modern UI/UX"]
        }
      ];
      
      // Apply client-side filtering for fallback data
      const filtered = activeFilter === 'All' 
        ? fallbackProjects 
        : fallbackProjects.filter(project => project.category === activeFilter);
      
      setProjects(filtered);
      setTotalProjects(filtered.length);
      
      // For fallback data, also implement unique view tracking
      fallbackProjects.forEach(async (project) => {
        const cookieName = `project_view_${String(project._id)}`;
        const hasViewed = Cookies.get(cookieName);
        
        if (!hasViewed) {
          try {
            await api.incrementProjectView(String(project._id));
            Cookies.set(cookieName, 'true', { expires: 1 });
          } catch (err) {
            console.error('Failed to increment view for project:', project._id, err);
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page when changing filter
    setSearchQuery(''); // Clear search when using category filter
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalProjects / itemsPerPage);

  return (
    <div className="section-padding animate-fade-in">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My Project Portfolio
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore my completed projects across various technologies and domains
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search projects by title, category, or description..."
            className="w-full md:w-96"
          />
          <div className="text-sm text-gray-600">
            {totalProjects} project{totalProjects !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Filter className="h-5 w-5 text-gray-500 mt-2" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-2">Failed to load projects from server</p>
              <p className="text-sm text-gray-600">Showing sample data instead</p>
            </div>
          </div>
        ) : null}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id || project.id} className="card overflow-hidden">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-w-full h-48 object-cover"
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
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary-600">
                    {project.price}
                  </div>
                  <a
                    href={`https://wa.me/919943980796?text=Hi%20Abdullah,%20I'm%20interested%20in%20the%20${project.title}%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>Request This</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery || activeFilter !== 'All' ? 'No projects found' : 'No projects available'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? `No projects match "${searchQuery}". Try a different search term.`
                  : activeFilter !== 'All'
                    ? `No projects found in "${activeFilter}" category.`
                    : 'Projects will appear here when available.'
                }
              </p>
              {(searchQuery || activeFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('All');
                    setCurrentPage(1);
                  }}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && projects.length > 0 && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalProjects}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Don't See What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6">
              I can create custom projects tailored to your specific requirements. Let's discuss your needs!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I%20need%20a%20custom%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Discuss Custom Project</span>
              </a>
              <a href="/contact" className="btn-secondary">
                Send Email Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;