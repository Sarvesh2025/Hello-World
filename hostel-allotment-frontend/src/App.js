import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function HostelSection({ students }) {
  return (
  <div className="flex flex-wrap bg-transparent">
  {students.map((student, index) => (
    <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6 w-80">
      <h2 className="text-xl font-bold mb-2">{student.name}</h2>
      <p className="text-gray-600">Branch: {student.branch}</p>
      <p className="text-gray-600">Year: {student.year}</p>
      <p className="text-gray-600">CGPA: {student.cgpa.toFixed(2)}</p>
    </div>
  ))}
</div>
  );
}

function HostelAllotment() {
  const [hostelA, setHostelA] = useState([]);
  const [hostelB, setHostelB] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/allot-hostels');
        setHostelA(response.data.hostelA);
        setHostelB(response.data.hostelB);
      } catch (error) {
        console.error('Error fetching hostel allotment data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" container mx-auto p-8">
  <div className=' flex justify-center'>
        <h1 className="text-4xl">Hostel Allotment</h1>
        </div>
      <Router>
        <div className="flex mb-4">
          <Link to="/" className=''>Home</Link>
          <Link to="/hostelA" className="text-blue-500 mr-4">Hostel A</Link>
          <Link to="/hostelB" className="text-blue-500">Hostel B</Link>
        </div>
        <Routes>
          <Route path="/" element={<HostelSection  />} />
          <Route path="/hostelA" element={<HostelSection students={hostelA} />} />
          <Route path="/hostelB" element={<HostelSection students={hostelB} />} />
        </Routes>
      </Router>

      <footer className="bg-gray-200 text-center p-4">
        Developed by Sarvesh
      </footer>
    </div>
  );
}

export default HostelAllotment;
