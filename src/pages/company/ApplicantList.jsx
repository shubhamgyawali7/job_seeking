import React, { useEffect, useState } from "react";
import { getAddedJobsApplicants, updateStatus } from "@/api/dashboard.js";
import { applicants } from "@/data/applicants";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const statusColors = {
  Pending: "bg-blue-50 text-blue-700 border-blue-200",
  Reviewed: "bg-amber-50 text-amber-700 border-amber-200",
  Accepted: "bg-green-50 text-green-700 border-green-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Interview: "bg-purple-50 text-purple-700 border-purple-200",
};

const ApplicantList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("All");
  const [updateJobsStatus, setUpdateJobsStatus] = useState("Pending");

  useEffect(() => {
    getAddedJobsApplicants()
      .then((response) => {
        setJobs(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching applicants:", error);
        setLoading(false);
      });
  }, []);

  // ... inside your ApplicantList component ...

  const handleStatusChange = async (applyId, newStatus) => {
    // 1. Find the specific applicant's name for the messages
    const applicant = jobs
      .flatMap((job) => job.applicants)
      .find((app) => app.applyId === applyId);

    const applicantName = applicant?.name || "Applicant";

    // 2. Browser Confirmation Popups
    if (newStatus === "Rejected") {
      if (!window.confirm(`Are you sure you want to REJECT ${applicantName}?`))
        return;
    }

    if (newStatus === "Accepted") {
      if (!window.confirm(`Do you want to move ${applicantName} to ACCEPTED?`))
        return;
    }

    // 3. Start Loading Toast
    const loadingToast = toast.loading(
      `Updating ${applicantName} to ${newStatus}...`
    );

    try {
      const response = await updateStatus(applyId, newStatus);

      if (response) {
        // 4. Update local state so UI updates immediately
        setJobs((prevJobs) =>
          prevJobs.map((job) => ({
            ...job,
            applicants: job.applicants.map((app) =>
              app.applyId === applyId ? { ...app, status: newStatus } : app
            ),
          }))
        );

        // 5. Success Toast (replaces loading toast)
        toast.success(
          `Successfully updated ${applicantName} to ${newStatus}!`,
          { id: loadingToast }
        );
      }
    } catch (error) {
      console.error("Update failed:", error);
      // 6. Error Toast
      toast.error(`Could not update ${applicantName}. Please try again.`, {
        id: loadingToast,
      });
    }
  };

  console.log("Jobs=>", jobs);
  // Extract all unique job titles for the filter dropdown
  const uniqueJobTitles = ["All", ...new Set(jobs.map((job) => job.jobTitle))];

  // Apply filters
  const filteredJobs = jobs
    .filter((job) => selectedJob === "All" || job.jobTitle === selectedJob)
    .map((job) => ({
      ...job,
      applicants: job.applicants.filter(
        (a) =>
          a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));

  // Count total visible applicants after filters
  const totalApplicants = filteredJobs.reduce(
    (acc, job) => acc + job.applicants.length,
    0
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold mb-4 text-[#164b7d] tracking-tight">
          Applicants List
        </h2>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="Search applicant by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors"
            />
          </div>

          {/* Job Filter */}
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#164b7d] focus:outline-none transition-colors text-[#164b7d] font-medium"
          >
            {uniqueJobTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          {/* Count */}
          <div className="bg-[#164b7d] text-white px-6 py-3 rounded-lg font-semibold shadow-sm">
            {totalApplicants} Results
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#164b7d] font-semibold text-lg">
            Loading applicants...
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-[#8a2f36] font-semibold text-lg mb-2">
            No applicants found
          </div>
          <div className="text-slate-500">
            Try adjusting your search or job filter
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredJobs.map(
            (job) =>
              job.applicants.length > 0 && (
                <div
                  key={job._id}
                  className="bg-white shadow-lg rounded-2xl border border-slate-200 p-6"
                >
                  {/* Job Info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 p-4 border-b">
                    {/* Left Section: Logo and Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={job.jobLogo}
                        alt={job.jobCompany}
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-[#164b7d] leading-tight">
                          {job.jobTitle}
                        </h3>
                        <p className="text-slate-600 font-medium">
                          {job.jobCompany}
                        </p>
                        <p className="text-slate-500 text-sm">
                          Deadline:{" "}
                          <span className="font-semibold text-[#8a2f36]">
                            {new Date(job.jobDeadline).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right Section: Status Dropdown */}
                    {/* <div className="flex items-center">
                      {job.applicants.map(
                        (applicant) =>
                          job.applicants.length > 0 && (
                            <select
                              className="appearance-none bg-white px-6 py-2 rounded-full text-sm font-semibold border-2 border-slate-200 focus:border-[#164b7d] focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                              value={setUpdateJobsStatus || "Pending"} // Replace with your state variable
                              onChange={(e) =>
                                handleStatusChange(
                                  applicant.applyId,
                                  e.target.value
                                )
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Interview">Reviewing</option>
                              <option value="Interview">Interview</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          )
                      )}
                    </div> */}
                  </div>

                  {/* Applicants */}
                  <div className="space-y-4">
                    {job.applicants.map((applicant, idx) => (
                      <div
                        key={applicant.id + idx}
                        className="flex flex-col md:flex-row justify-between items-center border border-slate-200 rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {/* Applicant Info */}
                        <div className="flex items-center gap-4 w-full md:w-1/2">
                          <div className="w-12 h-12 rounded-full bg-[#164b7d] text-white flex items-center justify-center font-bold">
                            {applicant.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-[#164b7d]">
                              {applicant.name}
                            </h4>
                            <p className="text-slate-600 text-sm">
                              {applicant.email}
                            </p>
                            <p className="text-slate-500 text-xs">
                              Applied:{" "}
                              {new Date(
                                applicant.appliedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-4">
                          <div className="flex flex-col items-end">
                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 mr-2">
                              Change Status
                            </label>
                            <select
                              className={`appearance-none bg-white px-4 py-2 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer focus:outline-none ${
                                statusColors[applicant.status] ||
                                "border-slate-200"
                              }`}
                              value={applicant.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  applicant.applyId,
                                  e.target.value
                                )
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Interview">Interview</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicantList;
