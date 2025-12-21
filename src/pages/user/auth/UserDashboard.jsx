import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, Search, Loader2, ArrowLeft } from "lucide-react";
import TrackedJobs from "@/components/jobs/TrackedJobs.jsx";
import JobStatsCards from "@/components/jobs/JobStatsCards";
import { useNavigate } from "react-router-dom";
import { getOwnAppliedJobs } from "@/api/apply";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();


  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const jobsResponse = await getOwnAppliedJobs();
       
        const data = jobsResponse?.data || jobsResponse || [];
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];

    let processed = jobs.map((job) => ({
      ...job.jobDetails,
      id: job._id || job.id,
      status: job.status || "Pending",
      appliedAt: job.appliedAt,
 
      title: job.jobDetails?.title || "Unknown Position",
      company: job.jobDetails?.company || "Unknown Company",
      location: job.jobDetails?.location || "Remote",
      logo: job.jobDetails?.logo,
    }));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      processed = processed.filter(
        (job) =>
          job.title?.toLowerCase().includes(query) ||
          job.company?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "All") {
      processed = processed.filter(
        (job) => job.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return processed;
  }, [jobs, searchQuery, statusFilter]);

  
  const getCount = (status) => {
    if (!Array.isArray(jobs)) return 0;
    return jobs.filter((j) => j.status?.toLowerCase() === status.toLowerCase())
      .length;
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-500 font-medium">
          Loading your applications...
        </p>
      </div>
    );
  console.log(filteredJobs.length);
  return (
    <div className="max-w-6xl mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name || "User"}. Track your journey.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>
      </div>

      <JobStatsCards
        pendingCount={getCount("pending")}
        rejectedCount={getCount("rejected")}
        interviewCount={getCount("Interview")}
        acceptedCount={getCount("accepted")}
        total={jobs.length}
      />

      {/* Filter Bar */}
      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm mb-8 mt-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <TrackedJobs key={job.id} {...job} />)
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">
              No applications found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
