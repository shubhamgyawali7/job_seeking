import React, { useEffect, useState } from "react";
import { getAddedJobsApplicants } from "@/api/dashboard.js";
import {
  Users,
  Briefcase,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Star,
  Menu,
  Bell,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch job data with applicants using the correct API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getAddedJobsApplicants();
        
        // Handle different response structures
        const jobsData = response?.data || response || [];
        
        // Ensure each job has an applicants array
        const processedJobs = jobsData.map(job => ({
          ...job,
          applicants: Array.isArray(job.applicants) ? job.applicants : []
        }));
        
        setJobs(processedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message || "Failed to fetch dashboard data");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="text-center p-20">Loading Dashboard...</div>;

  if (error)
    return (
      <div className="text-center p-20">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );

  // 🔹 Flatten all applicants with safety checks
  const applicants = jobs.flatMap((job) =>
    (job.applicants || []).map((app) => ({
      ...app,
      jobTitle: job.jobTitle || "Unknown Job",
      company: job.jobCompany || job.company || "Unknown Company",
    }))
  );

  // 📊 Stats
  const totalJobs = jobs.length;
  const totalApplicants = applicants.length;
  const totalPending = applicants.filter((a) => a.status === "Pending").length;
  const totalAccepted = applicants.filter(
    (a) => a.status === "Accepted"
  ).length;

  // 📈 Chart data: applications by job
  const jobApplicantData = jobs.map((job) => ({
    name: (job.jobTitle || "Unknown").split(" ")[0],
    Applicants: (job.applicants || []).length,
    Accepted: (job.applicants || []).filter((a) => a.status === "Accepted").length,
    fullName: job.jobTitle || "Unknown Job",
  }));

  // 🥧 Status distribution
  const statusData = [
    { name: "Pending", value: totalPending, color: "#f59e0b" },
    { name: "Accepted", value: totalAccepted, color: "#10b981" },
    {
      name: "Rejected",
      value: applicants.filter((a) => a.status === "Rejected").length,
      color: "#8a2f36",
    },
    {
      name: "Interview",
      value: applicants.filter((a) => a.status === "Interview").length,
      color: "#164b7d",
    },
  ].filter(item => item.value > 0); // Only show statuses with values

  // 🕒 Latest applicants
  const latestApplicants = [...applicants]
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 6);

  // 🎨 Helpers
  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "?";

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Interview":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Accepted":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-red-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Recruitment Dashboard
                </h1>
                <p className="text-slate-600">
                  Track applications and hiring progress
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-slate-600" />
                {totalPending > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Live Data
              </div>
              <div className="text-sm text-slate-500">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Total Applicants",
                value: totalApplicants,
                color: "from-blue-500 to-blue-600",
                icon: <Users className="w-6 h-6" />,
              },
              {
                label: "Active Jobs",
                value: totalJobs,
                color: "from-red-500 to-red-600",
                icon: <Briefcase className="w-6 h-6" />,
              },
              {
                label: "Pending",
                value: totalPending,
                color: "from-amber-500 to-amber-600",
                icon: <Clock className="w-6 h-6" />,
              },
              {
                label: "Accepted",
                value: totalAccepted,
                color: "from-emerald-500 to-emerald-600",
                icon: <CheckCircle2 className="w-6 h-6" />,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6
           border-2 border-transparent hover:border-blue-400
           hover:shadow-xl
           transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-br ${card.color} text-white p-3 rounded-xl  transition-transform`}
                  >
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart */}
            <div
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6
           border-2 border-transparent hover:border-blue-400
           hover:shadow-xl 
           transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Applications by Job
              </h3>
              {jobApplicantData.length > 0 ? (
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={jobApplicantData}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar
                        dataKey="Applicants"
                        fill="#164b7d"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Accepted"
                        fill="#8a2f36"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-500">
                  No job data available
                </div>
              )}
            </div>

            {/* Pie Chart */}
            <div
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6
           border-2 border-transparent hover:border-blue-400
           hover:shadow-xl 
           transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Status Distribution
              </h3>
              {statusData.length > 0 ? (
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {statusData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-500">
                  No applicant data available
                </div>
              )}
            </div>
          </div>

          {/* Recent Applicants */}
          <div
            className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6
           border-2 border-transparent">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Recent Applicants
            </h3>
            {latestApplicants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestApplicants.map((a, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {getInitials(a.name)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {a.name}
                          </h4>
                          <p className="text-sm text-slate-600">{a.company}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          a.status
                        )}`}
                      >
                        {a.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium mb-2">
                      {a.jobTitle}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Applied {formatDate(a.appliedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                No applicants yet
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;