import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MdArrowBack,
  MdLocationOn,
  MdWork,
  MdAttachMoney,
  MdAccessTime,
  MdBusiness,
  MdPeople,
  MdSchool,
  MdComputer,
  MdLanguage,
  MdBookmark,
  MdBookmarkBorder,
  MdShare,
  MdReportProblem,
  MdVerified,
  MdTrendingUp,
  MdCalendarToday,
  MdEmail,
  MdPhone,
  MdWeb,
  MdCheckCircle,
} from "react-icons/md";
import { getJobById } from "@/api/jobs.js";
import { applyJobs, getOwnAppliedJobs } from "@/api/apply";
import { toast } from "react-toastify";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if job is applied
  const [isApplied, setIsApplied] = useState(() => {
    const storedAppliedJobs = localStorage.getItem("appliedJobs");
    console.log(storedAppliedJobs);
    if (storedAppliedJobs) {
      const appliedJobs = JSON.parse(storedAppliedJobs);
      return appliedJobs.includes(params.id);
    }
    return false;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job details
        const jobResponse = await getJobById(params.id);
        setJob(jobResponse.data);
// console.log("Applied ID=>",params.id);
        // Check if user has applied to this job
        try {
          const appliedResponse = await getOwnAppliedJobs();
          const appliedJobIds = appliedResponse.data.map((application) => {
            return application.jobDetails?._id || application.jobId;
          });
          const hasApplied = appliedJobIds.includes(params.id);
          setIsApplied(hasApplied);
        } catch (appliedError) {
          console.log("No applied jobs or error:", appliedError);
          setIsApplied(false);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to load job details");
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  // Handle Apply Now
  const handleApply = async () => {
    if (isApplied) {
      toast.info(`You have already applied to this job!`);
      return;
    }

    if (isDeadlinePassed()) {
      toast.error("Application deadline has passed!");
      return;
    }

    try {
      await applyJobs(params.id);
      toast.success(`Applied to ${job.title} successfully!`);

      // Update local state
      setIsApplied(true);

      // Update localStorage
      const storedAppliedJobs = localStorage.getItem("appliedJobs");
      const appliedJobs = storedAppliedJobs
        ? JSON.parse(storedAppliedJobs)
        : [];
      if (!appliedJobs.includes(params.id)) {
        appliedJobs.push(params.id);
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      }
    } catch (error) {
      toast.error(`Can't apply to this job!`);
    }
  };

  // Handle Save Job
  const handleSave = async () => {
    const response = await getOwnAppliedJobs();
    const jobIds = response.data.map((job) => job.jobId);
    const isApplied = jobIds.includes("69427d15530ba86e86265teb");
    console.log("Applied data=>", isApplied);
  };

  // Handle Share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Check if deadline has passed
  const isDeadlinePassed = () => {
    if (!job?.deadline) return false;
    return new Date() > new Date(job.deadline);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
        <Card className="max-w-md w-full mx-4 text-center">
          <CardContent className="p-8">
            <MdReportProblem size={64} className="mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error Loading Job
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-800 hover:bg-blue-900"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/jobs")}
                className="border-blue-800 text-blue-800 hover:bg-blue-50"
              >
                <MdArrowBack className="mr-2" />
                Back to Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Job not found state
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
        <Card className="max-w-md w-full mx-4 text-center">
          <CardContent className="p-8">
            <MdReportProblem size={64} className="mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Job Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => navigate("/jobs")}
              className="bg-blue-800 hover:bg-blue-900"
            >
              <MdArrowBack className="mr-2" />
              Back to Jobs
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-800 to-red-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-blue-50 text-blue-800"
            >
              <MdArrowBack size={20} />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-blue-800 text-blue-800 hover:bg-blue-50"
              >
                <MdShare size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="border-red-800 text-red-800 hover:bg-red-50"
              >
                {isSaved ? (
                  <MdBookmark size={16} />
                ) : (
                  <MdBookmarkBorder size={16} />
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Header */}
            <div className="lg:col-span-2">
              {/* Applied Badge */}
              {isApplied && (
                <div className="mb-4 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  <MdCheckCircle size={20} />
                  <span className="font-semibold">
                    You have applied to this job
                  </span>
                </div>
              )}

              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-xl ring-4 ring-white shadow-lg bg-white flex items-center justify-center p-2">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${
                          job.company?.charAt(0) || "J"
                        }&background=1e40af&color=fff`;
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <MdVerified size={14} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MdBusiness size={18} className="text-blue-800" />
                      <span className="font-semibold">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdLocationOn size={18} className="text-red-800" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {job.postedDate && (
                      <div className="flex items-center gap-1">
                        <MdCalendarToday size={16} />
                        <span>Posted {formatDate(job.postedDate)}</span>
                      </div>
                    )}
                    {job.applicants && (
                      <div className="flex items-center gap-1">
                        <MdPeople size={16} />
                        <span>{job.applicants} applicants</span>
                      </div>
                    )}
                    {job.views && (
                      <div className="flex items-center gap-1">
                        <MdTrendingUp size={16} />
                        <span>{job.views} views</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Section */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6 shadow-xl border-0 bg-gradient-to-br from-blue-800 to-red-800 text-white">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2">{job.salary}</div>
                    <div className="text-blue-100">Per year</div>
                  </div>

                  {/* Application Status Badge */}
                  <div className="mb-4 text-center">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        isDeadlinePassed()
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {isDeadlinePassed()
                        ? "Application Closed"
                        : "Open for Applications"}
                    </span>
                  </div>

                  <Button
                    onClick={handleApply}
                    disabled={isApplied || isDeadlinePassed()}
                    className={`w-full font-semibold py-3 mb-3 ${
                      isApplied || isDeadlinePassed()
                        ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                        : "bg-white text-blue-800 hover:bg-gray-100"
                    }`}
                    size="lg"
                  >
                    {isApplied ? (
                      <span className="flex items-center justify-center gap-2">
                        <MdCheckCircle size={20} />
                        Already Applied
                      </span>
                    ) : isDeadlinePassed() ? (
                      "Application Closed"
                    ) : (
                      "Apply Now"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSave}
                    className="w-full border-white text-white hover:bg-white/10 font-semibold py-3 mb-3"
                  >
                    {isSaved ? (
                      <span className="flex items-center justify-center gap-2">
                        <MdBookmark size={20} />
                        Saved
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <MdBookmarkBorder size={20} />
                        Save Job
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center p-4 border-l-4 border-blue-800">
                <MdWork size={24} className="mx-auto mb-2 text-blue-800" />
                <div className="text-sm text-gray-600">Type</div>
                <div className="font-semibold text-gray-900">{job.type}</div>
              </Card>
              <Card className="text-center p-4 border-l-4 border-red-800">
                <MdAccessTime size={24} className="mx-auto mb-2 text-red-800" />
                <div className="text-sm text-gray-600">Experience</div>
                <div className="font-semibold text-gray-900">
                  {job.experience}
                </div>
              </Card>
              <Card className="text-center p-4 border-l-4 border-blue-800">
                <MdCalendarToday
                  size={24}
                  className="mx-auto mb-2 text-blue-800"
                />
                <div className="text-sm text-gray-600">Deadline</div>
                <div
                  className={`font-semibold ${
                    isDeadlinePassed() ? "text-red-600" : "text-gray-900"
                  }`}
                >
                  {formatDate(job.deadline)}
                </div>
              </Card>
              <Card className="text-center p-4 border-l-4 border-red-800">
                <MdPeople size={24} className="mx-auto mb-2 text-red-800" />
                <div className="text-sm text-gray-600">Applicants</div>
                <div className="font-semibold text-gray-900">
                  {job.applicants || 0}
                </div>
              </Card>
            </div>

            {/* Job Description */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
                  <MdWork size={24} />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-800 flex items-center gap-2">
                    <MdBusiness size={24} />
                    Key Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
                    <MdSchool size={24} />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-800 flex items-center gap-2">
                    <MdComputer size={24} />
                    Required Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
                    <MdTrendingUp size={24} />
                    Benefits & Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Company Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
                  <MdBusiness size={24} />
                  About {job.company}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.industry && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Industry</div>
                    <div className="font-semibold">{job.industry}</div>
                  </div>
                )}
                {job.companySize && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Company Size
                    </div>
                    <div className="font-semibold">{job.companySize}</div>
                  </div>
                )}
                {job.founded && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Founded</div>
                    <div className="font-semibold">{job.founded}</div>
                  </div>
                )}
                <div className="pt-4 border-t space-y-3">
                  {job.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <MdWeb size={16} className="text-blue-800" />
                      <a
                        href={job.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {job.website}
                      </a>
                    </div>
                  )}
                  {job.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <MdEmail size={16} className="text-red-800" />
                      <a
                        href={`mailto:${job.email}`}
                        className="text-red-600 hover:underline"
                      >
                        {job.email}
                      </a>
                    </div>
                  )}
                  {job.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <MdPhone size={16} className="text-blue-800" />
                      <a
                        href={`tel:${job.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {job.phone}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-red-800 flex items-center gap-2">
                  <MdLocationOn size={24} />
                  Job Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="font-semibold text-red-800 mb-2">
                    {job.location}
                  </div>
                  <div className="text-sm text-gray-600">
                    This position is available in {job.location}.{" "}
                    {job.type === "Remote"
                      ? "Remote work is available."
                      : "Office presence may be required."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
