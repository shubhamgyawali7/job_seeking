import { recruterAddedJobs } from "@/redux/dashboard/jobsAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const JobList = () => {
  const { jobs } = useSelector((state) => state.recruteAddedJobs);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch if user is authenticated and jobs haven't been loaded
    if (user) {
      dispatch(recruterAddedJobs());
    }
  }, [dispatch, user]);

  // console.log("Recruter Jobs=>>", jobs);
  const isJobOpen = (deadline) => {
    if (!deadline) return false;
    const currentDate = new Date();
    const jobDeadline = new Date(deadline);
    return jobDeadline >= currentDate ? "Open" : "Close";
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredJobs = jobs
    ?.filter((job) => {
      // Search filter
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      if (filterStatus === "All") {
        return matchesSearch; // Only search condition matters when "All" is selected
      }

      const jobStatus = isJobOpen(job.deadline); // Use your actual function name
      const matchesStatus = jobStatus === filterStatus; // Direct comparison since both are capitalized

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

  const formatDate = (date) => {
    // console.log("Deadline", deadline);
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search by title, company, or location..."
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors text-[#164b7d] font-medium"
              >
                <option value="All">All Jobs</option>
                <option value="Open">Open</option>
                <option value="Close">Close</option>
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
                {jobs?.length} Jobs
              </div>
              <div className="text-slate-600 font-medium">Page 1 to 5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      {filteredJobs?.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-[#8a2f36] font-semibold text-lg mb-2">
            No jobs found
          </div>
          <div className="text-slate-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs?.map((job) => (
              <div
                key={job._id}
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
                    <span className="text-slate-600 font-medium">
                      {job.company}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{job.location}</span>
                  </div>

                  {/* Salary */}
                  <div className="mb-4">
                    <span className="text-[#8a2f36] font-bold text-lg">
                      {job.salary}
                    </span>
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
                isJobOpen(job.deadline) === "Open"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
                    >
                      {isJobOpen(job.deadline)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {formatDate(job.deadline)}
                    </span>
                  </div>

                  <Link
                    to={`edit/${job._id}`}
                    className="bg-[#164b7d] hover:bg-[#8a2f36] text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default JobList;
