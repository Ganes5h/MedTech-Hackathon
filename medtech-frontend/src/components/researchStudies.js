import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, UserPlus, Target, X } from 'lucide-react';

const researchStudies = [
  {
    id: 1,
    title: "Innovative Alzheimer's Treatment Study",
    shortDescription: "Evaluating a new drug's effectiveness in slowing cognitive decline.",
    date: "Starting Sep 2024",
    duration: "24 months",
    participants: 500,
    status: "Recruiting",
    fullDescription: "This groundbreaking study aims to assess the efficacy of a novel drug in slowing the progression of Alzheimer's disease. Participants will undergo regular cognitive assessments and brain imaging over a two-year period.",
    eligibilityCriteria: [
      "Age 50-80",
      "Diagnosed with mild to moderate Alzheimer's",
      "No other neurological disorders",
      "Able to attend regular study visits"
    ]
  },
  {
    id: 2,
    title: "Type 2 Diabetes Management Program",
    shortDescription: "Testing a comprehensive lifestyle intervention for better glucose control.",
    date: "Ongoing",
    duration: "12 months",
    participants: 1000,
    status: "Active, not recruiting",
    fullDescription: "This study evaluates the effectiveness of a multifaceted lifestyle intervention program in improving glycemic control among Type 2 Diabetes patients. The program includes personalized diet plans, exercise regimens, and stress management techniques.",
    eligibilityCriteria: [
      "Diagnosed with Type 2 Diabetes for at least 1 year",
      "HbA1c between 7.0% and 10.0%",
      "Not currently on insulin therapy",
      "BMI between 25 and 40"
    ]
  },
  // Add more research studies as needed
];

const ResearchCard = ({ research, onClick }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    onClick={() => onClick(research)}
  >
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{research.title}</h3>
      <p className="text-gray-600 mb-4">{research.shortDescription}</p>
      <div className="flex items-center text-blue-600">
        <Calendar size={16} className="mr-2" />
        <span className="text-sm">{research.date}</span>
      </div>
    </div>
  </motion.div>
);

const ResearchModal = ({ research, onClose }) => (
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
          <h2 className="text-3xl font-bold text-gray-800">{research.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
            <span>{research.participants} participants</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Target size={20} className="mr-2" />
            <span>{research.status}</span>
          </div>
        </div>
        <p className="text-gray-700 mb-6">{research.fullDescription}</p>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Eligibility Criteria</h3>
        <ul className="list-disc pl-5 mb-6">
          {research.eligibilityCriteria.map((criteria, index) => (
            <li key={index} className="text-gray-700 mb-2">{criteria}</li>
          ))}
        </ul>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg">
          Apply for This Study
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const ResearchStudiesPage = () => {
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudies = researchStudies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Your existing Navbar component would go here */}
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Available Research Studies</h1>
        
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search studies..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((research) => (
            <ResearchCard key={research.id} research={research} onClick={setSelectedResearch} />
          ))}
        </div>

        {filteredStudies.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No studies found matching your search criteria.</p>
        )}
      </main>

      <AnimatePresence>
        {selectedResearch && (
          <ResearchModal
            research={selectedResearch}
            onClose={() => setSelectedResearch(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResearchStudiesPage;