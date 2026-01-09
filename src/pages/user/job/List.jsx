import React, { useState, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/api/jobs.js";
import { getOwnAppliedJobs } from "@/api/apply";
import { MdViewModule, MdViewList, MdWork, MdRefresh } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import JobsLoader from "@/components/skeleton/JobsLoader";
import { cn } from "@/lib/utils";

const List = () => {
  const [jobs, setJobs] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch all jobs
        const jobsResponse = await getJobs();
        const canApplyjobs = jobsResponse.data.filter(
          (job) => new Date(job.deadline) > new Date()
        );
        setJobs(canApplyjobs);
        // setJobs(jobsResponse.data || []);

        // 2. Fetch applied jobs from backend
        try {
          const appliedResponse = await getOwnAppliedJobs();
          // console.log("Applied Jobs Response:", appliedResponse.data);

          // Extract job IDs from the response
          const appliedIds = appliedResponse.data.map((application) => {
            return application.jobDetails?._id || application.jobId;
          });

          // console.log("Extracted Applied Job IDs:", appliedIds);
          setAppliedJobIds(new Set(appliedIds));
        } catch (appliedError) {
          console.log("No applied jobs or error:", appliedError);
          setAppliedJobIds(new Set()); // Empty set if no applied jobs
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle when a job is applied
  const handleJobApplied = (jobId) => {
    // console.log("Job applied:", jobId);
    const updatedAppliedJobs = new Set(appliedJobIds);
    updatedAppliedJobs.add(jobId);
    setAppliedJobIds(updatedAppliedJobs);
  };

  // console.log("Jobs =>", jobs);
  // console.log("Applied Job IDs =>", Array.from(appliedJobIds));

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-[Poppins]">
      <Header />

      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 mt-9 gap-4">
          <h1 className="text-3xl font-bold text-blue-900">
            {jobs.length} Jobs Available
            {appliedJobIds.size > 0 && (
              <span className="text-sm text-gray-600 ml-2">
                ({appliedJobIds.size} applied)
              </span>
            )}
          </h1>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
              className={cn(viewMode === "grid" && "bg-red-300")}
            >
              <MdViewModule size={20} />
            </Button>

            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className={cn(viewMode === "list" && "bg-red-300")}
            >
              <MdViewList size={20} />
            </Button>
          </div>
        </div>

        {/* Conditional Content */}
        {loading ? (
          <JobsLoader />
        ) : !jobs || jobs.length === 0 ? (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 py-12">
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdWork size={48} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Jobs Available
                </h3>
                <p className="text-gray-600 mb-6">
                  We're working hard to bring you the best opportunities.
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.location.reload()}
                >
                  <MdRefresh className="mr-2" size={20} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`w-full grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
          >
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                id={job._id}
                className={viewMode === "list" ? "w-full" : ""}
                logo={
                  job.logo ||
                  `https://ui-avatars.com/api/?name=${
                    job.company?.charAt(0) || "J"
                  }&background=1e88e5&color=fff`
                }
                company={job.company || "Company Name"}
                title={job.title || "Job Title"}
                salary={job.salary || "Salary not specified"}
                experience={job.experience || "Experience not specified"}
                type={job.type || job.workType || "Full-time"}
                location={job.location || "Remote"}
                deadline={job.deadline || "No deadline"}
                isApplied={appliedJobIds.has(job._id)}
                onJobApplied={handleJobApplied}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
