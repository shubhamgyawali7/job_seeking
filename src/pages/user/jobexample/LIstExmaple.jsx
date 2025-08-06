import JobCard from "@/components/jobs/JobCard";
import React, { useState, useMemo, useEffect } from "react";
// import { jobs } from "../../../data/jobs.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MdSearch,
  MdFilterList,
  MdSort,
  MdViewModule,
  MdViewList,
  MdLocationOn,
  MdWork,
  MdBusiness,
  MdTrendingUp,
  MdRefresh,
} from "react-icons/md";
import { getJobs } from "@/api/jobs.js";

const List = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getJobs()
      .then((response) => {
        console.log("Data=>", response.data);
        setJobs(response.data);
      })
      .catch();
  }, []);
  // Get unique values for filters
  const uniqueLocations = [
    ...new Set(jobs.map((job) => job.location).filter(Boolean)),
  ];
  const uniqueTypes = [
    ...new Set(jobs.map((job) => job.type || job.workType).filter(Boolean)),
  ];

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        !locationFilter || job.location === locationFilter;
      const matchesType =
        !typeFilter || job.type === typeFilter || job.workType === typeFilter;

      return matchesSearch && matchesLocation && matchesType;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.deadline || 0) - new Date(a.deadline || 0);
        case "salary":
          const salaryA = parseInt(a.salary?.replace(/[^\d]/g, "") || "0");
          const salaryB = parseInt(b.salary?.replace(/[^\d]/g, "") || "0");
          return salaryB - salaryA;
        case "company":
          return (a.company || "").localeCompare(b.company || "");
        case "location":
          return (a.location || "").localeCompare(b.location || "");
        default:
          return 0;
      }
    });

    return filtered;
  }, [jobs, searchTerm, locationFilter, typeFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setTypeFilter("");
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchTerm || locationFilter || typeFilter || sortBy !== "newest";

  if (!jobs || jobs.length === 0) {
    return (
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MdRefresh className="mr-2" size={20} />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Find Your Dream Job
              </h1>
              <p className="text-slate-600 flex items-center gap-2">
                <MdTrendingUp size={20} />
                {filteredAndSortedJobs.length} jobs available
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 ">
        {/* Search and Filters Section */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* <div className="flex flex-col lg:">  */}
              {/* Search Bar */}
              <div className="relative ">
                <MdSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
              {/* View Toggle */}
              <div className="flex items-center gap-2 m-3 float-none lg:float-right ">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <MdViewModule size={20} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <MdViewList size={20} />
                </Button>
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <MdFilterList size={20} />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  )}
                </Button>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MdLocationOn size={16} className="inline mr-1" />
                      Location
                    </label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">All Locations</option>
                      {uniqueLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MdWork size={16} className="inline mr-1" />
                      Job Type
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">All Types</option>
                      {uniqueTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MdSort size={16} className="inline mr-1" />
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="newest">Newest First</option>
                      <option value="salary">Highest Salary</option>
                      <option value="company">Company Name</option>
                      <option value="location">Location</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        {(searchTerm || locationFilter || typeFilter) && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-800 rounded-lg">
            <p className="text-blue-800">
              Showing {filteredAndSortedJobs.length} jobs
              {searchTerm && ` for "${searchTerm}"`}
              {locationFilter && ` in ${locationFilter}`}
              {typeFilter && ` • ${typeFilter}`}
            </p>
          </div>
        )}

        {/* No Results */}
        {filteredAndSortedJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <MdSearch size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Job Cards Grid */}
        {filteredAndSortedJobs.length > 0 && (
          <div
            className={`w-full grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
          >
            {filteredAndSortedJobs.map((job) => (
              <JobCard
                key={job.id}
                className={viewMode === "list" ? "w-full" : ""}
                id={job.id}
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
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredAndSortedJobs.length > 0 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-400"
            >
              Load More Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
