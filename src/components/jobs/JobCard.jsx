import { applyJobs } from "@/api/apply";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  MdOutlineTimer,
  MdOutlineAttachMoney,
  MdBusinessCenter,
  MdLocationOn,
  MdBusiness,
  MdBookmark,
  MdShare,
  MdCheckCircle,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const JobCard = ({
  id,
  logo,
  company,
  title,
  salary,
  experience,
  location,
  type,
  deadline,
  className = "",
  isApplied: isAppliedProp,
  onJobApplied,
}) => {
  const [isApplied, setIsApplied] = useState(isAppliedProp || false);

  // Update when prop changes
  useEffect(() => {
    setIsApplied(isAppliedProp || false);
  }, [isAppliedProp]);

  const getTypeColor = (type) => {
    const typeColors = {
      Remote: "bg-green-100 text-green-800",
      "Full Time": "bg-blue-100 text-blue-800",
      "Part Time": "bg-purple-100 text-purple-800",
      Temporary: "bg-yellow-100 text-yellow-800",
      Contract: "bg-orange-100 text-orange-800",
      Internship: "bg-pink-100 text-pink-800",
      Onsite: "bg-pink-100 text-pink-800",
    };
    return typeColors[type] || "bg-gray-100 text-gray-800";
  };

  const isUrgent = (deadline) => {
    if (!deadline) return false;
    return new Date() > new Date(deadline);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleApplyNow = async () => {
    if (isApplied) {
      toast.info(`You have already applied to ${title}!`);
      return;
    }
    if (isUrgent(deadline)) {
      toast.error("Application deadline has passed!");
      return;
    }
    try {
      await applyJobs(id);
      setIsApplied(true);
      toast.success(`Applied to ${title} successfully!`);

      if (onJobApplied) {
        onJobApplied(id);
      }
    } catch (error) {
      console.error("Apply Error:", error);

      if (
        error.response?.status === 400 ||
        error.response?.data?.message?.includes("already") ||
        error.message?.includes("already")
      ) {
        setIsApplied(true);
        toast.info(`You have already applied to ${title}!`);
        if (onJobApplied) {
          onJobApplied(id);
        }
      } else {
        toast.error(`Can't apply to ${title}!`);
      }
    }
  };
  
  return (
    <Card
      className={`group relative overflow-hidden border-1 shadow-lg hover:shadow-xl border-transparent hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 ${className}
      ${isUrgent(deadline)? `bg-red-200`:`bg-blue-100`}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={`absolute top-0 right-0 
          ${isUrgent(deadline) ? `bg-red-700` : `bg-green-600`}
          text-white px-2 py-1 text-xs font-semibold rounded-bl-lg z-10`}
      >
        {isUrgent(deadline) ? "Closed" : "Open"}
      </div>

      {/* Applied badge - UNCOMMENT THIS */}
      {isApplied && (
        <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-br-lg flex items-center gap-1 z-10">
          <MdCheckCircle size={14} />
          Applied
        </div>
      )}

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-xl ring-2 ring-white shadow-md bg-white flex items-center justify-center p-2">
                <img
                  src={logo}
                  alt={company}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {title}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 text-gray-600 mt-1">
                <MdBusiness size={16} />
                <span className="font-medium">{company}</span>
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MdBookmark size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MdShare size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <MdLocationOn size={18} className="text-gray-400" />
            <span className="text-sm font-medium">{location}</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
              type
            )}`}
          >
            {type}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MdBusinessCenter size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Experience</p>
              <p className="text-sm font-semibold text-gray-900">
                {experience}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <MdOutlineAttachMoney size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Salary</p>
              <p className="text-sm font-semibold text-gray-900">{salary}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-orange-100 rounded-lg">
              <MdOutlineTimer size={18} className="text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Deadline</p>
              <p
                className={`text-sm font-semibold ${
                  isUrgent(deadline) ? "text-red-600" : "text-gray-900"
                }`}
              >
                {formatDate(deadline)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-4">
        <div className="w-full space-y-2">
          <Button
            className={`w-full font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
              isApplied || isUrgent(deadline)
                ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r bg-red-800 hover:from-blue-700 hover:bg-red-600 transform hover:scale-[1.02] hover:shadow-lg"
            } text-white`}
            size="lg"
            onClick={handleApplyNow}
            disabled={isApplied}
          >
            {isApplied || isUrgent(deadline) ? (
              <span className="flex items-center justify-center gap-2">
                <MdCheckCircle size={20} />
                Already Applied
              </span>
            ) : (
              "Apply Now"
            )}
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 rounded-lg transition-all duration-300"
            size="sm"
          >
            <Link to={id}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
