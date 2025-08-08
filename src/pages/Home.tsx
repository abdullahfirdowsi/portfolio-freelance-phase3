import { ArrowRight, Check, Star, Code, Database, Brain, Globe, MessageCircle, Eye, Sparkles, TrendingUp, Award, Palette, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI & Data Science",
      description: "Expertise in artificial intelligence and machine learning",
      highlight: "Smart Solutions",
      gradient: "from-primary-600 to-primary-700"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Development",
      description: "Modern web applications with React and Node.js",
      highlight: "Full Stack",
      gradient: "from-primary-600 to-primary-700"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Problem Solver",
      description: "Creating innovative solutions to complex challenges",
      highlight: "Innovative Thinking",
      gradient: "from-primary-600 to-primary-700"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Awards & Recognition",
      description: "Multiple competition wins and academic achievements",
      highlight: "Award-Winning",
      gradient: "from-primary-600 to-primary-700"
    }
  ];

  const whyChooseMe = [
    "Passionate about technology and innovation",
    "Strong problem-solving skills and attention to detail",
    "Active in the developer community",
    "Continuous learning and improvement",
    "Proven track record of success",
    "Collaborative and team-oriented"
  ];

  const testimonials = [
    {
      name: "Open Source Contributor",
      role: "Peer Reviewer",
      text: "Abdullah consistently delivers high-quality code and actively contributes to the community. His technical expertise and passion for open source are truly inspiring.",
      rating: 5
    },
    {
      name: "Tech Mentor",
      role: "Mentee",
      text: "Learning from Abdullah has been incredibly valuable. His clear explanations and practical approach have helped me grow as a developer.",
      rating: 5
    }
  ];

  return (
    <div className="animate-fade-in overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-100/30 to-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-100/20 to-primary-100/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center text-left min-h-screen py-16 lg:py-20 xl:py-24 lg:min-h-[700px]">
            <div className="animate-slide-up space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-primary-50 text-primary-700 px-5 py-3 rounded-full text-base font-semibold border border-primary-100">
                  <Sparkles className="h-5 w-5" />
                  <span>Personal Portfolio</span>
                </div>
                
                {/* Mobile: Stacked text for full screen coverage */}
                <div className="block lg:hidden">
                  <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight space-y-2">
                    <div>Abdullah Firdowsi</div>
                    <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                      AI Developer & Engineer
                    </div>
                  </h1>
                </div>
                
                {/* Desktop: Inline text */}
                <div className="hidden lg:block">
                  <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-black text-gray-900 leading-tight">
                    Abdullah Firdowsi{' '}
                    <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                      AI Developer & Engineer
                    </span>
                  </h1>
                </div>
                
                <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl font-medium">
                  Passionate about creating intelligent solutions and developing modern web applications.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 items-stretch pt-4">
                <Link 
                  to="/projects" 
                  className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 shadow-lg"
                >
                  <Eye className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
                  <span>View Projects</span>
                  <ArrowRight className="h-7 w-7 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  to="/contact" 
                  className="group border-2 border-gray-300 hover:border-primary-500 text-gray-700 hover:text-primary-600 px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3 bg-white/90 backdrop-blur-sm"
                >
                  <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
            
            <div className="animate-slide-up hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl blur-xl transform rotate-3"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 xl:p-10 shadow-xl border border-white/60">
                  <div className="grid grid-cols-2 gap-6 xl:gap-8 text-center">
                    <div className="space-y-3">
                      <div className="text-3xl xl:text-4xl font-black bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">5+</div>
                      <div className="text-gray-600 font-semibold text-xs xl:text-sm">Projects</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-3xl xl:text-4xl font-black bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent flex items-center justify-center space-x-1">
                        <span>4</span>
                        <Star className="h-5 w-5 xl:h-6 xl:w-6 text-yellow-400 fill-current" />
                      </div>
                      <div className="text-gray-600 font-semibold text-xs xl:text-sm">Rating</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-3xl xl:text-4xl font-black bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">24/7</div>
                      <div className="text-gray-600 font-semibold text-xs xl:text-sm">Learning</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-3xl xl:text-4xl font-black bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">95%</div>
                      <div className="text-gray-600 font-semibold text-xs xl:text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white section-padding">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-secondary-50 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold border border-secondary-100">
              <Award className="h-4 w-4" />
              <span>Core Skills</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              My Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Specializing in AI development, web technologies, and innovative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Subtle Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  {service.icon}
                </div>
                
                {/* Content */}
                <div className="relative space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className={`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {service.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="bg-white section-padding">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Choose Me
            </h2>
            <p className="text-xl text-gray-600">
              What makes me stand out as a developer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseMe.map((reason, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Check className="h-6 w-6 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{reason}</h3>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <p className="text-gray-600">Detailed explanation of each reason</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              What Others Say
            </h2>
            <p className="text-xl text-gray-600">
              Feedback from peers and mentors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.rating}/5</h3>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <span className="text-gray-600">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;