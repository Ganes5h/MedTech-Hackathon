import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Users, Target, Cog, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';
const FadeInWhenVisible = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.8 }
      }}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <Navbar/>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="w-full h-full bg-blue-600 opacity-10"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Revolutionize Your Clinical Trials
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Efficient Recruitment, Enhanced Diversity, and Improved Management in One Powerful Platform
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-x-4"
          >
            <Link to="/public" className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl inline-flex items-center transform hover:scale-105">
              Explore Research Studies
              <ArrowRight className="ml-2" size={24} />
            </Link>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl inline-flex items-center transform hover:scale-105">
              Learn More
            </button>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={40} className="text-gray-500" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Key Features</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FadeInWhenVisible>
              <div className="text-center">
                <Users size={48} className="mx-auto text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Enhanced Recruitment</h3>
                <p className="text-gray-600">Reach a diverse pool of participants quickly and efficiently.</p>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
              <div className="text-center">
                <Target size={48} className="mx-auto text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Precision Targeting</h3>
                <p className="text-gray-600">Find the right participants for your specific research needs.</p>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
              <div className="text-center">
                <Cog size={48} className="mx-auto text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Streamlined Management</h3>
                <p className="text-gray-600">Simplify trial operations with our comprehensive tools.</p>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold text-center mb-12">Benefits of Our Platform</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInWhenVisible>
              <div className="flex items-start">
                <Check size={24} className="text-green-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Faster Recruitment</h3>
                  <p>Reduce time-to-start for your clinical trials with our advanced matching algorithms.</p>
                </div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
              <div className="flex items-start">
                <Check size={24} className="text-green-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Increased Diversity</h3>
                  <p>Access a wider, more diverse participant pool to enhance the quality of your research.</p>
                </div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
              <div className="flex items-start">
                <Check size={24} className="text-green-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
                  <p>Optimize your budget with our efficient recruitment and management solutions.</p>
                </div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
              <div className="flex items-start">
                <Check size={24} className="text-green-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Compliance Assured</h3>
                  <p>Stay compliant with regulatory requirements using our built-in compliance tools.</p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold text-gray-800 mb-10">Ready to Transform Your Clinical Trials?</h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Link
              to="/research-studies"
              className="bg-blue-600 text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl inline-flex items-center"
            >
              View Available Studies
              <ArrowRight className="ml-3" size={24} />
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Revolutionizing clinical trials with cutting-edge technology and participant-centric approaches.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Clinical Trial Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;