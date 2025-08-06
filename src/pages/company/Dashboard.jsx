import React, { useState } from "react";
// import SideBar from "../../components/dashboard/SideBar"; // Import the sidebar component
import { 
  Users, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Calendar,
  Star,
  Menu,
  Bell
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
  Cell
} from "recharts";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock data based on your original structure
  const jobs = [
    { id: 1, title: "Frontend Developer", department: "Engineering" },
    { id: 2, title: "UX Designer", department: "Design" },
    { id: 3, title: "Product Manager", department: "Product" },
    { id: 4, title: "Data Scientist", department: "Analytics" },
    { id: 5, title: "DevOps Engineer", department: "Engineering" }
  ];

  const applicants = [
    { id: 1, name: "Sarah Johnson", jobId: 1, status: "Accepted", appliedDate: "2024-07-10", rating: 4.5 },
    { id: 2, name: "Michael Chen", jobId: 2, status: "Applied", appliedDate: "2024-07-12", rating: 4.2 },
    { id: 3, name: "Emma Rodriguez", jobId: 1, status: "Reviewed", appliedDate: "2024-07-13", rating: 4.8 },
    { id: 4, name: "David Kim", jobId: 3, status: "Accepted", appliedDate: "2024-07-14", rating: 4.6 },
    { id: 5, name: "Lisa Wang", jobId: 2, status: "Applied", appliedDate: "2024-07-15", rating: 4.3 },
    { id: 6, name: "Alex Thompson", jobId: 4, status: "Reviewed", appliedDate: "2024-07-15", rating: 4.7 },
    { id: 7, name: "Maria Garcia", jobId: 5, status: "Applied", appliedDate: "2024-07-15", rating: 4.1 }
  ];

  // Stats calculations
  const totalJobs = jobs.length;
  const totalApplicants = applicants.length;
  const totalPending = applicants.filter(
    (a) => a.status === "Applied" || a.status === "Reviewed"
  ).length;
  const totalAccepted = applicants.filter(
    (a) => a.status === "Accepted"
  ).length;

  // Enhanced data for visualizations
  const jobApplicantData = jobs.map((job) => ({
    name: job.title.split(' ')[0] + (job.title.split(' ')[1] ? ' ' + job.title.split(' ')[1].charAt(0) : ''),
    Applicants: applicants.filter((a) => String(a.jobId) === String(job.id)).length,
    Accepted: applicants.filter((a) => String(a.jobId) === String(job.id) && a.status === "Accepted").length,
    fullName: job.title
  }));

  // Status distribution for pie chart
  const statusData = [
    { name: "Applied", value: applicants.filter(a => a.status === "Applied").length, color: "#f59e0b" },
    { name: "Reviewed", value: applicants.filter(a => a.status === "Reviewed").length, color: "#8a2f36" },
    { name: "Accepted", value: applicants.filter(a => a.status === "Accepted").length, color: "#10b981" }
  ];

  // Latest applicants with enhanced data
  const latestApplicants = [...applicants]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 6)
    .map((applicant) => ({
      ...applicant,
      jobTitle: jobs.find((job) => String(job.id) === String(applicant.jobId))?.title || "N/A",
      department: jobs.find((job) => String(job.id) === String(applicant.jobId))?.department || "N/A"
    }));

  // Helper functions
  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Reviewed": return "bg-red-100 text-red-800 border-red-200";
      case "Accepted": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-red-50">

      
      {/* Main Content */}
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
                <h1 className="text-2xl font-bold text-slate-800">Recruitment Dashboard</h1>
                <p className="text-slate-600">Track applications and hiring progress</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Applicants</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{totalApplicants}</p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +12% from last month
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Jobs</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{totalJobs}</p>
                  <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    3 new this week
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Review</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{totalPending}</p>
                  <p className="text-sm text-amber-600 mt-1 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Needs attention
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Accepted</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{totalAccepted}</p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {Math.round((totalAccepted / totalApplicants) * 100)}% acceptance rate
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Bar Chart */}
            <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Applications by Position</h3>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobApplicantData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#164b7d"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis allowDecimals={false} stroke="#164b7d" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.95)', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value, name) => [value, name]}
                      labelFormatter={(label) => {
                        const job = jobApplicantData.find(j => j.name === label);
                        return job ? job.fullName : label;
                      }}
                    />
                    <Bar dataKey="Applicants" fill="#164b7d" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Accepted" fill="#8a2f36" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Status Distribution</h3>
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
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Recent Applications</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All →
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="bg-white/80 rounded-xl p-4 border border-slate-200 hover:shadow-md hover:scale-105 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {getInitials(applicant.name)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{applicant.name}</h4>
                        <p className="text-sm text-slate-600">{applicant.department}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-slate-700 font-medium">{applicant.jobTitle}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Applied {formatDate(applicant.appliedDate)}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-400" />
                        <span>{applicant.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;