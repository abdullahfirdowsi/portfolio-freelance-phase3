import React from 'react';
import { GraduationCap, Award, Code, Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

const About = () => {
  const education = [
    {
      degree: "B.Tech - Artificial Intelligence and Data Science",
      institution: "Karpagam College of Engineering, Coimbatore",
      period: "2021 - 2025",
      grade: "CGPA: 8.3"
    },
    {
      degree: "Higher Secondary School (12th Grade)",
      institution: "Sathya Saai Matric Hr Sec School, Pasar",
      period: "2020 - 2021",
      grade: "Percentage: 91%"
    },
    {
      degree: "Secondary School (10th Grade)",
      institution: "Senthil Matric Hr Sec School, Virudhachalam",
      period: "2018 - 2019",
      grade: "Percentage: 92%"
    }
  ];

  const experience = [
    {
      role: "Software Engineer Trainee",
      company: "iLink Digital",
      period: "Feb 2025 – Jun 2025",
      description: "Working as a Generative AI Engineer in the Digital Experience and AI Business Unit, gaining hands-on experience in .NET, C#, Python and Angular for developing dynamic applications, while leveraging Azure Cloud Services for deployment, management, and scalability."
    },
    {
      role: "Power BI Intern",
      company: "We & Data",
      period: "May 2023",
      description: "Contributed to developing practical skills in utilizing Microsoft Power BI to create engaging dashboards and worked on diverse projects to sharpen my skills to craft visualizations and interactive reports."
    }
  ];

  const skills = {
    "Programming Languages": ["Python", "JavaScript", "HTML", "CSS", "R", "SQL"],
    "Frameworks & Tools": ["Django", "React.js", "Streamlit", "GitHub", "VS Code", "Jupyter"],
    "Data & AI": ["Machine Learning", "Deep Learning", "Data Analytics", "Data Visualization"],
    "Databases & Cloud": ["MySQL", "MongoDB", "Power BI", "Tableau", "Google Colab"]
  };

  const achievements = [
    "1st Place in Poster Presentation (NITT Vortex'23)",
    "1st Place in Paper Presentation (PSG Kriya'23)",
    "1st Place in Paper Presentation (BIT V-Prayukti'23)",
    "Silver Idea Winner - Idea Presentation (StartupTN)",
    "Published Research Paper in International Journal"
  ];

  const certifications = [
    "Coursera Machine Learning Specialization",
    "NPTEL Database Management System",
    "DataCamp Associate Data Analyst",
    "NVIDIA Fundamentals of Deep Learning",
    "FreeCodeCamp Data Analysis with Python"
  ];

  return (
    <div className="section-padding animate-fade-in">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Abdullah Firdowsi
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Passionate AI & Data Science Expert | Your Trusted Project Mentor
          </p>
        </div>

        {/* Personal Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                I'm Abdullah Firdowsi, a passionate AI and Data Science enthusiast currently pursuing my B.Tech 
                in Artificial Intelligence and Data Science from Karpagam College of Engineering, Coimbatore. 
                With a strong academic background and hands-on experience in cutting-edge technologies, I've 
                dedicated myself to helping fellow students achieve their academic goals.
              </p>
              <p>
                My journey in technology began with a curiosity about how machines can learn and make decisions. 
                This curiosity led me to explore various domains including machine learning, web development, 
                data analysis, and research. Over the years, I've completed numerous projects and helped 500+ 
                students with their academic projects.
              </p>
              <p>
                What sets me apart is my commitment to not just delivering projects, but ensuring students 
                understand the concepts and can confidently present their work. I believe in creating original, 
                high-quality solutions that help students learn while achieving excellent grades.
              </p>
            </div>
          </div>
          
          <div className="bg-primary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">Based in Coimbatore, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">B.Tech AI & Data Science Student</span>
              </div>
              <div className="flex items-center space-x-3">
                <Code className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">500+ Projects Completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">Multiple Competition Winner</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-primary-200">
              <h4 className="font-semibold text-gray-900 mb-3">Connect with me:</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/abdullahfirdowsi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com/in/abdullahfirdowsi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="mailto:abdullahfirdowsi@gmail.com"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Education Background</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-primary-600 font-semibold">{edu.period}</p>
                    <p className="text-gray-700">{edu.grade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-primary-600 font-medium">{exp.company}</p>
                  </div>
                  <p className="text-gray-600 mt-2 md:mt-0">{exp.period}</p>
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Achievements & Awards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-secondary-50 rounded-lg p-6 border-l-4 border-secondary-500">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-secondary-600" />
                  <p className="text-gray-800 font-medium">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-primary-600 mb-3">
                  <GraduationCap className="h-8 w-8 mx-auto" />
                </div>
                <p className="text-gray-800 font-medium">{cert}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Publication */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Research Publication</h2>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              "Energy of a graph associated with the Tamil Nadu District Map"
            </h3>
            <p className="text-gray-600 mb-4">
              Published in International Research Journal of Education and Technology
            </p>
            <a
              href="#"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View Publication</span>
            </a>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="bg-primary-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Let's Work Together!
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Ready to bring your project ideas to life? I'm here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I'd%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>WhatsApp Me</span>
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;