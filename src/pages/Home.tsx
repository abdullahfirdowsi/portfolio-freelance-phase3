import { ArrowRight, CheckCircle, Star, Code, Database, Brain, Globe, MessageCircle, Eye, Sparkles, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../components/WhatsAppIcon';

const Home = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Mini Projects",
      description: "Quick turnaround projects perfect for semester submissions",
      price: "₹500 - ₹2.5K",
      gradient: "from-primary-500 to-primary-600"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Major Projects",
      description: "Comprehensive final year projects with complete documentation",
      price: "₹3K - ₹5K",
      gradient: "from-secondary-500 to-secondary-600"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "IEEE Papers",
      description: "Research papers and conference submissions with implementation",
      price: "₹6K - ₹8K",
      gradient: "from-primary-600 to-primary-700"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Development",
      description: "Full-stack web applications with modern frameworks for your business needs",
      price: "₹5K - ₹10K",
      gradient: "from-secondary-600 to-secondary-700"
    }
  ];

  const whyChooseMe = [
    "Fresh graduate with hands-on project experience",
    "Original code with clear documentation",
    "Help with viva preparation and explanations",
    "24/7 support via WhatsApp for quick queries",
    "Affordable pricing for students",
    "Delivery within agreed timelines"
  ];

  const testimonials = [
    {
      name: "Prem Kumar",
      course: "B.Tech AD, Final Year",
      text: "Good work on my project. Code was clean and documentation was helpful for my presentation.",
      rating: 4
    },
    {
      name: "Sheik Mohamed",
      course: "B.Sc., CS 2nd Year",
      text: "Delivered my mini project on time. Helped me understand the code for viva preparation.",
      rating: 5
    },
    {
      name: "Rahul A",
      course: "B.E CSE (CY), 3rd Year",
      text: "Satisfied with the project work. Good communication and delivered as promised.",
      rating: 4
    }
  ];

  return (
    <div className="animate-fade-in overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 section-padding overflow-hidden">
      <section className="relative bg-gradient-to-br from-gray-50 via-primary-50/40 to-primary-100/30 section-padding overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-100/30 to-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-100/20 to-primary-100/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            <div className="animate-slide-up space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold border border-primary-100">
                  <Sparkles className="h-4 w-4" />
                  <span>Professional Project Development</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                  Get Your{' '}
                  <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                    College Projects
                  </span>{' '}
                  Done
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl font-medium">
                  Mini, Major, IEEE Papers — Quick delivery with documentation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
                <Link 
                  to="/projects" 
                  className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 shadow-lg"
                >
                  <Eye className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>View Projects</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  to="/contact" 
                  className="group border-2 border-gray-300 hover:border-primary-500 text-gray-700 hover:text-primary-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3 bg-white/90 backdrop-blur-sm"
                >
                  <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Get Quote</span>
                </Link>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl blur-xl transform rotate-3"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/60">
                  <div className="grid grid-cols-2 gap-8 text-center">
                    <div className="space-y-3">
                      <div className="text-4xl font-black bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">5+</div>
                      <div className="text-gray-600 font-semibold text-sm">Projects Completed</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-4xl font-black bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent flex items-center justify-center space-x-1">
                        <span>4</span>
                        <Star className="h-6 w-6 text-yellow-400 fill-current" />
                      </div>
                      <div className="text-gray-600 font-semibold text-sm">Client Rating</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-4xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">24/7</div>
                      <div className="text-gray-600 font-semibold text-sm">Support Available</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-4xl font-black bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">95%</div>
                      <div className="text-gray-600 font-semibold text-sm">Success Rate</div>
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
              <span>Core Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              My Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive project solutions for all your academic needs
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
                  <div className={`text-2xl font-black bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {service.price}
                  </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-100 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="relative bg-white section-padding overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-50/50 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-secondary-50 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold border border-secondary-100">
                  <CheckCircle className="h-4 w-4" />
                  <span>Why Choose Me</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                  Why Choose Me?
                </h2>
              </div>
              
              <div className="space-y-6">
                {whyChooseMe.map((point, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">{point}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="group inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span>Learn More About Me</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl blur-xl transform -rotate-3"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-white/60">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <span>Skills</span>
                </h3>
                <div className="space-y-6">
                  {[
                    { skill: "Python & AI/ML", level: "Good", color: "from-primary-500 to-primary-600" },
                    { skill: "Web Development", level: "Good", color: "from-secondary-500 to-secondary-600" },
                    { skill: "Data Science", level: "Learning", color: "from-primary-600 to-primary-700" },
                    { skill: "Documentation", level: "Good", color: "from-secondary-600 to-secondary-700" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center group">
                      <span className="text-lg text-gray-700 font-semibold group-hover:text-gray-900 transition-colors duration-300">{item.skill}</span>
                      <span className={`px-4 py-2 bg-gradient-to-r ${item.color} text-white font-bold rounded-full text-sm shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white section-padding">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold border border-primary-100">
              <Star className="h-4 w-4" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real feedback from satisfied clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">"</span>
                </div>
                
                {/* Stars */}
                <div className="flex items-center mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-gray-300 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${(testimonial.rating + i) * 50}ms` }} />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  "{testimonial.text}"
                </p>
                
                {/* Client Info */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{testimonial.name}</div>
                  <div className="text-gray-600 font-medium">{testimonial.course}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white section-padding overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                <MessageCircle className="h-4 w-4" />
                <span>Get Started Today</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                Ready to Get Started?
              </h2>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Let's discuss your project requirements and get you the perfect solution
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <a
                href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I'm%20interested%20in%20your%20project%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 shadow-xl min-w-[280px]"
              >
                <WhatsAppIcon className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Start WhatsApp Chat</span>
              </a>
              <Link
                to="/contact"
                className="group border-2 border-white/50 hover:border-white text-white hover:bg-white hover:text-primary-600 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm min-w-[280px]"
              >
                <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Send Email</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;