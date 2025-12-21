import React from "react";
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  XCircle,
  PlayCircle,
  History,
} from "lucide-react";

import logo from "@/assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { JOB_ROUTE } from "@/constants/routes";

const TrackedJobs = ({
  id,
  logo,
  description,
  title,
  company,
  location,
  appliedAt,
  experience,
  deadline,
  salary,
  type,
  status,
}) => {
  // Logic: Formatter for readable dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Logic: Status UI Configuration
  const getStatusConfig = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "interview":
        return {
          label: "Interview",
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: PlayCircle,
        };
      case "accepted":
        return {
          label: "Accepted",
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          icon: CheckCircle,
        };
      case "rejected":
        return {
          label: "Rejected",
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: XCircle,
        };
      default: // Handles "pending" or others
        return {
          label: "Pending",
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: Clock,
        };
    }
  };
  // const navigate = useNavigate();
  // const handleViewDetails = () => {
  //   navigate(`${JOB_ROUTE}/${id}`);
  // };

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Section: Company Logo & Basic Info */}
          <div className="flex items-start space-x-5">
            <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              {logo ? (
                <img
                  src={logo}
                  alt={company}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building className="text-gray-400 w-8 h-8" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <div className="flex items-center text-gray-600 font-semibold mb-3">
                <Building className="w-4 h-4 mr-1.5 text-gray-400" />
                {company}
              </div>

              {/* Badges/Tags Row */}
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                <div className="flex items-center bg-gray-50 px-2 py-0.5 rounded-md">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />{" "}
                  {location || "Remote"}
                </div>
                <div className="flex items-center bg-gray-50 px-2 py-0.5 rounded-md">
                  <Briefcase className="w-4 h-4 mr-1 text-gray-400" />{" "}
                  {type || "Full-time"}
                </div>
                <div className="flex items-center font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  <History className="w-4 h-4 mr-1" />
                  Applied {formatDate(appliedAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Salary */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 w-full md:w-auto">
            <div className="flex items-center text-lg font-bold text-green-500">
              Salary{" "}
            </div>
            <div className="flex items-center text-lg font-bold text-gray-900">
              {salary || "Best in Industry"}
            </div>
          </div>
        </div>

        {/* Section: Job Description Preview */}
        {description && (
          <p className="mt-5 text-gray-600 text-sm line-clamp-2 leading-relaxed italic border-l-2 border-gray-100 pl-4">
            {description}
          </p>
        )}

        {/* Section: Metadata Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4 text-[11px] uppercase tracking-wider font-bold text-gray-400">
          <div className="flex gap-3">
            <span className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Experience: {experience || "Entry Level"}
            </span>
            <span className="bg-red-50 border border-red-100 px-3 py-1 rounded-md text-red-500 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              Deadline: {formatDate(deadline)}
            </span>
          </div>
          {/* Status & */}
          <div>
            <div
              className={`flex items-center px-4 py-1.5 rounded-full text-lg font-black border uppercase tracking-widest ${config.bg} ${config.text} ${config.border} shadow-sm`}
            >
              <StatusIcon className="w-4 h-4 mr-1.5" />
              {config.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackedJobs;
