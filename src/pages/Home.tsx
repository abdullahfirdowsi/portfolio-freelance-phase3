import { ArrowRight, CheckCircle, Star, Code, Database, Brain, Globe, MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Mini Projects",
      description: "Quick turnaround projects perfect for semester submissions",
      price: "₹2K - ₹5K"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Major Projects",
      description: "Comprehensive final year projects with complete documentation",
      price: "₹6K - ₹15K"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "IEEE Papers",
      description: "Research papers and conference submissions",
      price: "₹8K - ₹12K"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Development",
      description: "Full-stack web applications with modern frameworks",
      price: "₹5K - ₹20K"
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
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get Your{' '}
                <span className="text-primary-600">College Projects Done</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Mini, Major, IEEE Papers — Quick delivery with documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/projects" className="btn-primary flex items-center justify-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>View Projects</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I'm%20interested%20in%20your%20project%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Me</span>
                </a>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="bg-primary-50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">5+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600">4/5</div>
                    <div className="text-gray-600">Client Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600">24/7</div>
                    <div className="text-gray-600">Support Available</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600">95%</div>
                    <div className="text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              My Core Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive project solutions for all your academic needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="text-lg font-bold text-primary-600">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Me?
              </h2>
              <div className="space-y-4">
                {whyChooseMe.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-secondary-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/about" className="btn-primary">
                  Learn More About Me
                </Link>
              </div>
            </div>
            <div className="bg-primary-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Python & AI/ML</span>
                  <span className="text-primary-600 font-semibold">Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Web Development</span>
                  <span className="text-primary-600 font-semibold">Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Data Science</span>
                  <span className="text-primary-600 font-semibold">Learning</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Documentation</span>
                  <span className="text-primary-600 font-semibold">Good</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.course}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your project requirements and get you the perfect solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I'm%20interested%20in%20your%20project%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Start WhatsApp Chat</span>
            </a>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Send Email
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;