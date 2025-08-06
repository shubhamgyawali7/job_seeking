import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Building, DollarSign, Clock, Filter, Search, Briefcase, Heart, CheckCircle, XCircle, AlertCircle, Users } from 'lucide-react';
import {savedJobs,appliedJobs} from '../../../api/applysave.js'
const UserDashboard = () => {
  

  const [activeTab, setActiveTab] = useState('applied');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statusOptions = ['All', 'Pending', 'Interview', 'Accepted', 'Rejected'];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Interview': return <Users className="w-4 h-4 text-blue-500" />;
      case 'Accepted': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Interview': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAppliedJobs = useMemo(() => {
    let filtered = appliedJobs;

    if (statusFilter !== 'All') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.jobDetails.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobDetails.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobDetails.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [statusFilter, searchQuery]);

  const filteredSavedJobs = useMemo(() => {
    if (searchQuery) {
      return savedJobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return savedJobs;
  }, [searchQuery]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusCounts = () => {
    const counts = { total: appliedJobs.length };
    statusOptions.slice(1).forEach(status => {
      counts[status] = appliedJobs.filter(job => job.status === status).length;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Job Dashboard</h1>
                <p className="text-gray-600 mt-1">Track your job applications and saved opportunities</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg" style={{backgroundColor: '#164b7d', color: 'white'}}>
                  <span className="text-sm font-medium">Total Applied: {statusCounts.total}</span>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-lg" style={{backgroundColor: '#8e3031', color: 'white'}}>
                  <span className="text-sm font-medium">Saved: {savedJobs.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8" style={{color: '#164b7d'}} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applied</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Pending || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <Users className="w-8 h-8" style={{color: '#164b7d'}} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Interview</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Interview || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Accepted || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <XCircle className="w-8 h-8" style={{color: '#8e3031'}} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Rejected || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('applied')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applied'
                    ? 'text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'applied' ? {borderColor: '#164b7d', color: '#164b7d'} : {}}
              >
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Applied Jobs ({appliedJobs.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'saved' ? {borderColor: '#8e3031', color: '#8e3031'} : {}}
              >
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Saved Jobs ({savedJobs.length})
                </div>
              </button>
            </nav>
          </div>

          {/* Filters */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs, companies, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{'--tw-ring-color': '#164b7d'}}
                  />
                </div>
              </div>
              {activeTab === 'applied' && (
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-blue-500"
                    style={{'--tw-ring-color': '#164b7d', borderColor: '#164b7d'}}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status === 'All' ? 'All Status' : status}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'applied' && (
            <div className="space-y-4">
              {filteredAppliedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredAppliedJobs.map((application) => (
                  <div key={application._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={application.jobDetails.logo} 
                            alt={application.jobDetails.company}
                            className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-2"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {application.jobDetails.title}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <Building className="w-4 h-4 mr-1" />
                              <span className="font-medium">{application.jobDetails.company}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {application.jobDetails.location}
                              </div>
                              <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {application.jobDetails.type}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Applied {formatDate(application.appliedAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1">{application.status}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {application.jobDetails.salary}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {application.jobDetails.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Experience: {application.jobDetails.experience}</span>
                            <span>•</span>
                            <span>Deadline: {formatDate(application.jobDetails.deadline)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-4">
              {filteredSavedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No saved jobs found</h3>
                  <p className="text-gray-500">Save jobs you're interested in to view them here</p>
                </div>
              ) : (
                filteredSavedJobs.map((job) => (
                  <div key={job._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={job.logo} 
                            alt={job.company}
                            className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-2"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {job.title}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <Building className="w-4 h-4 mr-1" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {job.type}
                              </div>
                              <div className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                Saved {formatDate(job.savedAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Experience: {job.experience}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-4 py-2 text-white rounded-lg hover:opacity-90 text-sm font-medium" style={{backgroundColor: '#164b7d'}}>
                              Apply Now
                            </button>
                            <button className="px-4 py-2 text-white rounded-lg hover:opacity-90 text-sm font-medium" style={{backgroundColor: '#8e3031'}}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;