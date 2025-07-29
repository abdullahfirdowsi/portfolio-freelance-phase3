import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, HelpCircle } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }
      
      const result = await response.json();
      setSubmitStatus({ type: 'success', message: result.message || 'Thank you for your message! I will get back to you soon.' });
      setFormData({ name: '', email: '', projectType: '', message: '' });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact me directly via WhatsApp.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <WhatsAppIcon className="h-6 w-6 text-green-600" />,
      title: "WhatsApp",
      description: "Get instant response",
      value: "+91-9943980796",
      link: "https://wa.me/919943980796",
      primary: true
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "For detailed inquiries",
      value: "abdullahfirdowsi@gmail.com",
      link: "mailto:abdullahfirdowsi@gmail.com",
      primary: false
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      description: "Direct call",
      value: "+91-9943980796",
      link: "tel:+919943980796",
      primary: false
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      description: "Based in",
      value: "Coimbatore, India",
      link: "#",
      primary: false
    }
  ];

  const faqs = [
    {
      question: "How long does it take to complete a project?",
      answer: "Mini projects: 3-7 days, Major projects: 10-20 days, IEEE papers: 15-25 days. Rush delivery available for urgent needs."
    },
    {
      question: "What payment methods do you accept?",
      answer: "I accept UPI, bank transfer, and online payments. 50% advance required to start work."
    },
    {
      question: "Do you provide source code?",
      answer: "Yes, complete source code with comments and documentation is provided after full payment."
    },
    {
      question: "Can you help with viva preparation?",
      answer: "Absolutely! I provide viva preparation support and can explain your project in detail."
    },
    {
      question: "What if I need revisions?",
      answer: "Free revisions are included as per package. Additional revisions are charged separately."
    },
    {
      question: "Do you work on custom projects?",
      answer: "Yes, I can work on custom projects based on your specific requirements. Contact me for a quote."
    }
  ];

  return (
    <div className="section-padding animate-fade-in">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ready to start your project? Let's discuss your requirements and get you the perfect solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h2>
            
            {/* Status Messages */}
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="">Select project type</option>
                  <option value="mini">Mini Project</option>
                  <option value="major">Major Project</option>
                  <option value="ieee">IEEE Paper</option>
                  <option value="web">Web Development</option>
                  <option value="ai-ml">AI/ML Project</option>
                  <option value="data-science">Data Science</option>
                  <option value="custom">Custom Project</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Describe your project requirements, deadline, and any specific needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="block p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-gray-300 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{method.title}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                        <p className="font-medium text-gray-800">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response Time */}
            <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-secondary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Quick Response Time</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• WhatsApp: Within 1 hour (9 AM - 10 PM)</li>
                <li>• Email: Within 6 hours</li>
                <li>• Phone: Available 9 AM - 8 PM</li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200 text-center">
              <WhatsAppIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Get instant response on WhatsApp for urgent queries
              </p>
              <a
                href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I%20need%20immediate%20help%20with%20my%20project."
                className="bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center space-x-2"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-6 w-6 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-primary-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Don't hesitate to reach out. I'm here to help you succeed with your projects.
            </p>
            <a
              href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I%20have%20some%20questions%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center space-x-2"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;