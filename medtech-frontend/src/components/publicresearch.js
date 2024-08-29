import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Clock, UserPlus, Target, Users, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-circular-progressbar/dist/styles.css';

const ResearchStudiesPage = () => {
  const [researchStudies, setResearchStudies] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState({});
  const studiesPerPage = 6;

  useEffect(() => {
    const fetchResearchStudies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/research/');
        setResearchStudies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch research studies. Please try again later.');
        setLoading(false);
      }
    };

    fetchResearchStudies();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userIds = Array.from(new Set(researchStudies.map(study => study.createdBy)));
        const userRequests = userIds.map(id => axios.get(`http://localhost:5000/api/auth/${id}`));
        const responses = await Promise.all(userRequests);
        const userMap = responses.reduce((acc, response) => {
          acc[response.data._id] = response.data.name;
          return acc;
        }, {});
        setUsers(userMap);
      } catch (err) {
        setError('Failed to fetch user data. Please try again later.');
      }
    };

    if (researchStudies.length) {
      fetchUsers();
    }
  }, [researchStudies]);

  const filteredStudies = researchStudies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudy = currentPage * studiesPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
  const currentStudies = filteredStudies.slice(indexOfFirstStudy, indexOfLastStudy);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <motion.div
          className="text-5xl text-indigo-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          &#9696;
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <p className="text-red-600 text-xl bg-white p-6 rounded-lg shadow-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <main className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-5xl font-bold text-indigo-800 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Available Research Studies
        </motion.h1>

        <motion.div
          className="mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search studies..."
              className="w-full px-6 py-3 rounded-full border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-3.5 text-indigo-400" size={24} />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentStudies.map((research, index) => (
            <motion.div
              key={research._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedResearch(research)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-2">{research.title}</h3>
                  <p className="text-gray-600 mb-4">{research.description}</p>
                  <div className="flex items-center justify-between text-indigo-600">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{new Date(research.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      <span className="text-sm">{research.participants.length}</span>
                    </div>
                    <div className="flex items-center">
                      <UserPlus size={16} className="mr-2" />
                      <span className="text-sm">{users[research.createdBy]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStudies.length === 0 && (
          <motion.p
            className="text-center text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No research studies found.
          </motion.p>
        )}

        {filteredStudies.length > studiesPerPage && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center">
              {currentPage > 1 && (
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="text-indigo-500 hover:text-indigo-700 text-xl font-semibold"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <span className="mx-4 text-lg text-gray-600">
                Page {currentPage} of {Math.ceil(filteredStudies.length / studiesPerPage)}
              </span>
              {currentPage < Math.ceil(filteredStudies.length / studiesPerPage) && (
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="text-indigo-500 hover:text-indigo-700 text-xl font-semibold"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {selectedResearch && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-indigo-800">{selectedResearch.title}</h2>
                <button onClick={() => setSelectedResearch(null)} className="text-gray-500 hover:text-gray-700 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-700 mb-6">{selectedResearch.description}</p>
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar size={20} className="mr-2" />
                  <span>{new Date(selectedResearch.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={20} className="mr-2" />
                  <span>{selectedResearch.participants.length} Participants</span>
                </div>
              </div>
              {selectedResearch.mediaPaths.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800 mb-4">Media</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedResearch.mediaPaths.map((media, index) => (
                      <img key={index} src={media} alt={`Media ${index + 1}`} className="rounded-lg shadow-md" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ResearchStudiesPage;
