import JobForm from "@/components/jobs/JobForm";
import { JOBSLIST_ROUTE } from "@/constants/routes";
import { ArrowLeft, Briefcase } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AddJob = () => {
 
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* Back Button */}
      <div className="w-full max-w-4xl px-6 mb-6">
        <Link
          to={JOBSLIST_ROUTE}
          className="px-4 py-2 flex items-center text-[#164B7D] hover:text-[#8A2F36] font-semibold transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          BACK
        </Link>
      </div>

      {/* Header (Centered) */}
      <div className="w-full max-w-4xl flex justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#164B7D] flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#164B7D]">Create Job</h1>
        </div>
      </div>

      {/* Job Form */}
      <div className="w-full max-w-4xl">
        <JobForm/>
      </div>
    </section>
  );
}


export default AddJob;
