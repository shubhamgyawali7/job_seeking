import React, { useState } from "react";
import { jobs } from "../../../data/jobs.js";
import { Link } from "react-router-dom";

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6); // Number of jobs per page

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All" || job.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.postedDate) - new Date(a.postedDate);
      } else if (sortBy === "oldest") {
        return new Date(a.postedDate) - new Date(b.postedDate);
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, sortBy]);

  const uniqueStatuses = ["All", ...new Set(jobs.map(job => job.status))];

  // Pagination component
  const Pagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg font-medium transition-all ${
            currentPage === 1
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white text-[#164b7d] hover:bg-[#164b7d] hover:text-white border border-slate-200'
          }`}
        >
          Previous
        </button>

        {/* First page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-2 rounded-lg font-medium bg-white text-[#164b7d] hover:bg-[#164b7d] hover:text-white border border-slate-200 transition-all"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-slate-500">...</span>}
          </>
        )}

        {/* Page numbers */}
        {pages.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-lg font-medium transition-all ${
              currentPage === page
                ? 'bg-[#8a2f36] text-white'
                : 'bg-white text-[#164b7d] hover:bg-[#164b7d] hover:text-white border border-slate-200'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 text-slate-500">...</span>}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 rounded-lg font-medium bg-white text-[#164b7d] hover:bg-[#164b7d] hover:text-white border border-slate-200 transition-all"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg font-medium transition-all ${
            currentPage === totalPages
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white text-[#164b7d] hover:bg-[#164b7d] hover:text-white border border-slate-200'
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-[#164b7d] tracking-tight">
              Job Listings
            </h2>
            <div className="w-20 h-1 bg-[#8a2f36] rounded-full mt-2"></div>
          </div>
          <Link
            to="add"
            className="bg-[#8a2f36] hover:bg-[#164b7d] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Add Job
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors text-[#164b7d] font-medium"
              >
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors text-[#164b7d] font-medium"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
              <div className="bg-[#164b7d] text-white px-4 py-3 rounded-lg font-semibold">
                {filteredJobs.length} Jobs
              </div>
              <div className="text-slate-600 font-medium">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-[#8a2f36] font-semibold text-lg mb-2">
            No jobs found
          </div>
          <div className="text-slate-500">
            {searchTerm || filterStatus !== "All" ? "Try adjusting your search or filter" : "No jobs available"}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="group bg-white rounded-xl shadow-lg border border-slate-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#8a2f36] relative overflow-hidden"
              >
                {/* Subtle hover accent */}
                <div className="absolute inset-0 bg-[#164b7d] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Job Title */}
                  <h3 className="text-xl font-bold mb-3 text-[#164b7d] group-hover:text-[#8a2f36] transition-colors line-clamp-2">
                    {job.title}
                  </h3>
                  
                  {/* Company and Location */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-slate-600 font-medium">{job.company}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{job.location}</span>
                  </div>
                  
                  {/* Salary */}
                  <div className="mb-4">
                    <span className="text-[#8a2f36] font-bold text-lg">{job.salary}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-700 mb-6 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100 relative z-10">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-2 transition-all
                        ${
                          job.status === "Open"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                    >
                      {job.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {job.postedDate}
                    </span>
                  </div>
                  
                  <Link
                    to={`edit/${job.id}`}
                    className="bg-[#164b7d] hover:bg-[#8a2f36] text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && <Pagination />}
        </>
      )}
    </div>
  );
};

export default JobList;