import React, { useState } from 'react';
import { ExternalLink, Github, MessageCircle, Filter } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'AI/ML', 'Web Development', 'Data Science', 'IoT', 'Mobile App'];

  const projects = [
    {
      id: 1,
      title: "Amazon E-Commerce Product Quality Analysis",
      category: "AI/ML",
      description: "Interactive website leveraging customer reviews and real-time product data to forecast Amazon product quality using LSTM model.",
      techStack: ["Python", "LSTM", "Sentiment Analysis", "Scraper API", "Render"],
      price: "₹12,000",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Real-time data scraping", "Sentiment analysis", "LSTM prediction", "Interactive dashboard"]
    },
    {
      id: 2,
      title: "LeafCare - Cassava Plant Disease Detection",
      category: "AI/ML",
      description: "Deep learning approach using CNN and EfficientNetB0 model to classify diseases in cassava leaf images with 96% accuracy.",
      techStack: ["Python", "CNN", "EfficientNetB0", "Streamlit", "Image Processing"],
      price: "₹10,000",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["96% accuracy", "CNN implementation", "Streamlit interface", "Image classification"]
    },
    {
      id: 3,
      title: "EduSphere - Personalized Learning Platform",
      category: "Web Development",
      description: "Comprehensive platform combining monitoring, programming, grading, and teaching for educational excellence.",
      techStack: ["React.js", "Flask", "MySQL", "XAMPP", "REST API"],
      price: "₹15,000",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["User management", "Progress tracking", "Interactive learning", "Grade management"]
    },
    {
      id: 4,
      title: "Smart Home IoT System",
      category: "IoT",
      description: "Complete IoT solution for home automation with mobile app control and real-time monitoring.",
      techStack: ["Arduino", "ESP32", "React Native", "Firebase", "Sensors"],
      price: "₹8,000",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Mobile control", "Real-time monitoring", "Voice commands", "Energy optimization"]
    },
    {
      id: 5,
      title: "Stock Price Prediction System",
      category: "Data Science",
      description: "Advanced machine learning model for predicting stock prices using historical data and market indicators.",
      techStack: ["Python", "TensorFlow", "Pandas", "NumPy", "Matplotlib"],
      price: "₹9,000",
      image: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Time series analysis", "Multiple algorithms", "Data visualization", "Performance metrics"]
    },
    {
      id: 6,
      title: "E-Commerce Mobile App",
      category: "Mobile App",
      description: "Full-featured mobile e-commerce application with payment integration and user management.",
      techStack: ["React Native", "Node.js", "MongoDB", "Stripe", "Redux"],
      price: "₹18,000",
      image: "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Payment integration", "User authentication", "Product catalog", "Order management"]
    },
    {
      id: 7,
      title: "Hospital Management System",
      category: "Web Development",
      description: "Comprehensive hospital management system with patient records, appointment scheduling, and billing.",
      techStack: ["Django", "PostgreSQL", "Bootstrap", "JavaScript", "Chart.js"],
      price: "₹14,000",
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Patient management", "Appointment system", "Billing module", "Reports generation"]
    },
    {
      id: 8,
      title: "Weather Prediction ML Model",
      category: "AI/ML",
      description: "Machine learning model for weather prediction using historical weather data and atmospheric parameters.",
      techStack: ["Python", "Scikit-learn", "Pandas", "Seaborn", "API Integration"],
      price: "₹7,000",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Multiple ML algorithms", "Weather API integration", "Data preprocessing", "Accuracy comparison"]
    },
    {
      id: 9,
      title: "Social Media Analytics Dashboard",
      category: "Data Science",
      description: "Real-time social media analytics dashboard with sentiment analysis and engagement metrics.",
      techStack: ["Python", "Streamlit", "Twitter API", "NLP", "Plotly"],
      price: "₹11,000",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Real-time analytics", "Sentiment analysis", "Interactive charts", "Social media APIs"]
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Filter className="h-5 w-5 text-gray-500 mt-2" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card overflow-hidden">
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
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Request This</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

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
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
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