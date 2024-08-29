import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, UserPlus, Target, X, ChevronLeft, ChevronRight, Users, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ResearchCard = ({ research, onClick }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    onClick={() => onClick(research)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="p-6">
      <h3 className="text-xl font-semibold text-indigo-800 mb-2">{research.title}</h3>
      <p className="text-gray-600 mb-4">{research.shortDescription}</p>
      <div className="flex items-center justify-between text-indigo-600">
        <div className="flex items-center">
          <Calendar size={16} className="mr-2" />
          <span className="text-sm">{research.date}</span>
        </div>
        <div className="flex items-center">
          <Users size={16} className="mr-2" />
          <span className="text-sm">{research.currentParticipants}/{research.targetParticipants}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const ResearchModal = ({ research, onClose, onJoinRequest }) => {
  const [joinRequestStatus, setJoinRequestStatus] = useState(null);

  const handleJoinRequest = async () => {
    try {
      await onJoinRequest(research._id);
      setJoinRequestStatus('success');
    } catch (error) {
      setJoinRequestStatus('error');
    }
  };

  return (
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
            <h2 className="text-3xl font-bold text-indigo-800">{research.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar size={20} className="mr-2" />
              <span>{research.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={20} className="mr-2" />
              <span>{research.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <UserPlus size={20} className="mr-2" />
              <span>{research.currentParticipants}/{research.targetParticipants} participants</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Target size={20} className="mr-2" />
              <span>{research.status}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{research.fullDescription}</p>
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">Eligibility Criteria</h3>
          <ul className="list-disc pl-5 mb-6">
            {research.eligibilityCriteria && research.eligibilityCriteria.map((criteria, index) => (
              <li key={index} className="text-gray-700 mb-2">{criteria}</li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <div className="w-32 h-32">
              <CircularProgressbar
                value={(research.currentParticipants / research.targetParticipants) * 100}
                text={`${Math.round((research.currentParticipants / research.targetParticipants) * 100)}%`}
                styles={buildStyles({
                  textColor: '#4F46E5',
                  pathColor: '#4F46E5',
                  trailColor: '#E0E7FF',
                })}
              />
            </div>
            <motion.button
              className={`px-6 py-3 rounded-full font-semibold text-white shadow-md transition ${
                joinRequestStatus === 'success' ? 'bg-green-600 hover:bg-green-700' :
                joinRequestStatus === 'error' ? 'bg-red-600 hover:bg-red-700' :
                'bg-indigo-600 hover:bg-indigo-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinRequest}
              disabled={joinRequestStatus === 'success'}
            >
              {joinRequestStatus === 'success' ? 'Request Sent' :
               joinRequestStatus === 'error' ? 'Error, Try Again' :
               'Request to Join Study'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ResearchStudiesPage = () => {
  const [researchStudies, setResearchStudies] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleJoinRequest = async (researchId) => {
    try {
      await axios.post('http://localhost:5000/api/participant/request', { researchId });
      // Update the local state to reflect the new participant request
      setResearchStudies(prevStudies =>
        prevStudies.map(study =>
          study._id === researchId
            ? { ...study, participantRequests: [...study.participantRequests, 'currentUserId'] }
            : study
        )
      );
    } catch (error) {
      throw error;
    }
  };

  const filteredStudies = researchStudies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ResearchCard research={research} onClick={setSelectedResearch} />
            </motion.div>
          ))}
        </div>

        {filteredStudies.length === 0 && (
          <motion.p
            className="text-center text-gray-600 mt-12 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No studies found matching your search criteria.
          </motion.p>
        )}

        {filteredStudies.length > studiesPerPage && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-4 px-4 py-2 rounded-full bg-indigo-600 text-white disabled:opacity-50 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastStudy >= filteredStudies.length}
              className="px-4 py-2 rounded-full bg-indigo-600 text-white disabled:opacity-50 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedResearch && (
          <ResearchModal
            research={selectedResearch}
            onClose={() => setSelectedResearch(null)}
            onJoinRequest={handleJoinRequest}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResearchStudiesPage;