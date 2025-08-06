import React, { useEffect, useState } from "react";
import { applicants as applicantsData } from "../../data/applicants.js";

const statusColors = {
  Applied: "bg-blue-50 text-blue-700 border-blue-200",
  Reviewed: "bg-amber-50 text-amber-700 border-amber-200",
  Accepted: "bg-green-50 text-green-700 border-green-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

// Alternating card styles for better visual separation
const cardPatterns = ["bg-white", "bg-slate-50"];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    setTimeout(() => {
      setApplicants(applicantsData);
      setLoading(false);
    }, 500);
  }, []);

  // Filter applicants based on search and status
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || applicant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const uniqueStatuses = ["All", ...new Set(applicants.map(app => app.status))];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold mb-2 text-[#164b7d] tracking-tight">
          Applicants List
        </h2>
        <div className="w-20 h-1 bg-[#8a2f36] rounded-full mb-6"></div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors text-[#164b7d] font-medium"
              >
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <div className="bg-[#164b7d] text-white px-4 py-3 rounded-lg font-semibold">
                {filteredApplicants.length} Results
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#164b7d] font-semibold text-lg">Loading applicants...</div>
        </div>
      ) : filteredApplicants.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-[#8a2f36] font-semibold text-lg mb-2">
            No applicants found
          </div>
          <div className="text-slate-500">
            {searchTerm || filterStatus !== "All" ? "Try adjusting your search or filter" : "No applicants available"}
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {filteredApplicants.map((applicant, idx) => (
            <div
              key={applicant.id}
              className={`
                group
                flex flex-row items-center justify-between
                shadow-md rounded-xl px-8 py-6
                transition-all duration-300
                ${cardPatterns[idx % cardPatterns.length]}
                hover:shadow-xl hover:scale-[1.02] hover:border-l-4 hover:border-[#8a2f36]
                border border-slate-200
                relative overflow-hidden
              `}
            >
              {/* Subtle hover accent */}
              <div className="absolute inset-0 bg-[#164b7d] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              {/* Left: Avatar, Name, Email, Date */}
              <div className="flex-1 min-w-0 flex items-center gap-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#164b7d] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {getInitials(applicant.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-[#164b7d] truncate mb-1">
                    {applicant.name}
                  </h3>
                  <div className="text-slate-600 font-medium text-sm truncate mb-1">
                    {applicant.email}
                  </div>
                  <div className="text-slate-500 text-xs">
                    Applied on{" "}
                    <span className="font-semibold text-[#8a2f36]">
                      {applicant.appliedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center: ID and Resume */}
              <div className="flex flex-col items-center justify-center mx-8 relative z-10">
                <div className="text-xs text-slate-500 font-mono mb-3 bg-slate-100 px-2 py-1 rounded">
                  ID: {applicant.id}
                </div>
                {applicant.resumeUrl ? (
                  <a
                    href={applicant.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#8a2f36] hover:bg-[#164b7d] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-slate-400 bg-slate-100 px-4 py-2 rounded-lg text-sm">
                    No Resume
                  </span>
                )}
              </div>

              {/* Right: Status */}
              <div className="flex-shrink-0 ml-6 relative z-10">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                    statusColors[applicant.status] ||
                    "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  {applicant.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantList;