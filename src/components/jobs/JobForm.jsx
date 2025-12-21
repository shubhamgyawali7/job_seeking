import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  FileText,
  CheckCircle,
  ClipboardList,
  Award,
  Gift,
  Image,
  Globe,
  Calendar,
} from "lucide-react";
import { JOBSLIST_ROUTE } from "@/constants/routes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addJob, editJob } from "@/api/jobs";

const JobForm = ({ job }) => {
  const [loading, setLoading] = useState(false);

  const initialValue = {
    title: job?.title || "",
    company: job?.company || "",
    logo: job?.logo || "",
    experience: job?.experience || "",
    jobType: job?.jobType || "Remote",
    location: job?.location || "",
    salary: job?.salary || "",
    deadline: job?.deadline ? job.deadline.split("T")[0] : "",
    description: job?.description || "",
    responsibilities: Array.isArray(job?.responsibilities)
      ? job.responsibilities.join("\n")
      : "",
    requirements: Array.isArray(job?.requirements)
      ? job.requirements.join("\n")
      : "",
    skills: Array.isArray(job?.skills) ? job.skills.join("\n") : "",
    benefits: Array.isArray(job?.benefits) ? job.benefits.join("\n") : "",
  };

  const { register, formState, handleSubmit } = useForm({
    values: initialValue,
  });
  console.log("Bacend Data=>", job);
  const { errors } = formState;
  const navigate = useNavigate();
  const isEditing = !!job;

  async function submitForm(data) {
    setLoading(true);
    const formatToArray = (str) => {
      if (!str) return [];
      if (Array.isArray(str)) return str;
      return str
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    };
    const formattedData = {
      title: data.title,
      company: data.company,
      logo: data.logo,
      experience: data.experience,
      location: data.location,
      salary: data.salary,
      description: data.description,
      jobType: data.jobType ,
      responsibilities: formatToArray(data.responsibilities),
      requirements: formatToArray(data.requirements),
      skills: formatToArray(data.skills),
      benefits: formatToArray(data.benefits),
      deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
    };
    // console.log("SENDING TO BACKEND:", formattedData);
    try {
      if (isEditing) {
        await editJob(job._id, formattedData);
      } else {
        await addJob(formattedData);
      }
      toast.success(`Job ${isEditing ? "updated" : "added"} successfully!`);
      navigate(JOBSLIST_ROUTE);
    } catch (error) {
      // This will now show the actual validation message from your backend
      toast.error(error.response?.data || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Basic Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" /> Job Title
                    </label>
                    <input
                      type="text"
                      {...register("title", { required: "Required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500"
                      placeholder="e.g. Data Scientist"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" /> Company
                    </label>
                    <input
                      type="text"
                      {...register("company", { required: "Required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Image className="w-5 h-5 text-blue-600" /> Company Logo URL
                  </label>
                  <input
                    type="url"
                    {...register("logo", { required: "Required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" /> Experience
                      Level
                    </label>
                    <input
                      type="text"
                      {...register("experience", { required: "Required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                      placeholder="e.g. 3-6 years"
                    />
                  </div>
                   <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" /> Job Type
                    </label>
                    <select
                      {...register("jobType", { required: "Required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                    >
                      <option value="Remote">Remote</option>
                      <option value="On-site">Onsite</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" /> Location
                    </label>
                    <input
                      type="text"
                      {...register("location", { required: "Required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                      placeholder="e.g. Kolkata"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-blue-600" /> Salary
                      Range
                    </label>
                    <input
                      type="text"
                      {...register("salary", { required: "Required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                      placeholder="e.g. ₹16,00,000 - ₹22,00,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" /> Application
                    Deadline
                  </label>
                  <input
                    type="date"
                    {...register("deadline", { required: "Required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                  />
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Job Details
                </h2>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" /> Description
                  </label>
                  <textarea
                    {...register("description", { required: "Required" })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                    placeholder="Describe the role..."
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-blue-600" /> Key
                    Responsibilities (One per line)
                  </label>
                  <textarea
                    {...register("responsibilities", { required: "Required" })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                    placeholder="Lead design team&#10;Create wireframes"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />{" "}
                    Requirements (One per line)
                  </label>
                  <textarea
                    {...register("requirements", { required: "Required" })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                    placeholder="Bachelors degree&#10;3 years experience"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" /> Required Skills
                    (One per line)
                  </label>
                  <textarea
                    {...register("skills", { required: "Required" })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                    placeholder="React&#10;Figma&#10;Tailwind"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-blue-600" /> Benefits & Perks
                    (One per line)
                  </label>
                  <textarea
                    {...register("benefits", { required: "Required" })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                    placeholder="Remote work&#10;Health insurance"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {loading
                    ? "Processing..."
                    : isEditing
                    ? "Update Job"
                    : "Create Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
