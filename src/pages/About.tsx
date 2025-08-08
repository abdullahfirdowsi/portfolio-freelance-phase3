import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Brain, Award, Globe, Users, Book, GraduationCap, Building, Trophy, Sparkles, Check, Star } from 'lucide-react';

const About = () => {
  const [education, setEducation] = useState([
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Karpagam College of Engineering",
      year: "2021-2025",
      achievements: [
        "Graduated with distinction",
        "Received multiple academic excellence awards",
        "Active participant in technical clubs and workshops"
      ]
    }
  ]);

  const [experience, setExperience] = useState([
    {
      title: "Full Stack Developer",
      company: "iLink Digital",
      duration: "2024 - Present",
      description: "Developing and maintaining web applications using modern technologies",
      achievements: [
        "Led the development of multiple successful projects",
        "Implemented AI-powered features",
        "Optimized application performance",
        "Mentored junior developers"
      ]
    },
    {
      title: "AI/ML Intern",
      company: "Tech Innovations",
      duration: "2023 - 2024",
      description: "Worked on AI and machine learning projects",
      achievements: [
        "Developed predictive models",
        "Created data visualization tools",
        "Published research papers"
      ]
    }
  ]);

  const [achievements, setAchievements] = useState([
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "International AI Competition Winner",
      description: "Won gold medal in AI challenge 2024",
      date: "2024"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Research Publication",
      description: "Published paper on AI optimization techniques",
      date: "2024"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Top Contributor",
      description: "Recognized as top contributor in open source community",
      date: "2023"
    }
  ]);

  const [skills, setSkills] = useState([
    {
      category: "Programming",
      items: [
        "JavaScript/TypeScript",
        "Python",
        "React",
        "Node.js",
        "MongoDB"
      ]
    },
    {
      category: "AI/ML",
      items: [
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision"
      ]
    },
    {
      category: "Tools",
      items: [
        "Git",
        "Docker",
        "AWS",
        "Jupyter",
        "TensorFlow"
      ]
    }
  ]);

  return (
    <div className="section-padding">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold border border-primary-100">
            <Sparkles className="h-4 w-4" />
            <span>About Me</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            My Journey & Expertise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Exploring the intersection of AI and web development
          </p>
        </div>

        {/* Experience Timeline */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Professional Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-8">
                {/* Line */}
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200"></div>
                {/* Dot */}
                <div className="absolute left-0 top-0 w-6 h-6 bg-primary-600 rounded-full shadow-lg"></div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-600">{exp.duration}</span>
                    </div>
                    <span className="text-gray-500">{exp.company}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-primary-600" />
                        <span className="text-gray-600">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                  <div className="flex space-x-4">
                    {edu.achievements.map((ach, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                        <Check className="h-4 w-4 mr-1.5" />
                        {ach}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((ach, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {ach.icon}
                  <h3 className="text-xl font-bold text-gray-900">{ach.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{ach.description}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {ach.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.items.map((skill, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-primary-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Collaborate?
            </h3>
            <p className="text-gray-200 mb-6">
              I'm always open to new opportunities and interesting projects.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-white text-primary-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <Sparkles className="h-5 w-5" />
              <span>Get in Touch</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;