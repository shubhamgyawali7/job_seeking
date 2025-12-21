import {
  Briefcase,
  CheckCircle,
  Clock,
  Heart,
  Users,
  XCircle,
} from "lucide-react";

const JobStatsCards = ({total,rejectedCount,acceptedCount,interviewCount,pendingCount}) => {
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <Briefcase className="w-8 h-8" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applied</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <Users className="w-8 h-8" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Interview</p>
              <p className="text-2xl font-bold text-gray-900">{interviewCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accepted</p>
              <p className="text-2xl font-bold text-gray-900">{acceptedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <XCircle className="w-8 h-8" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            <button className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Applied Jobs {total}
              </div>
            </button>
            <button className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 ">
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Saved Jobs 20
              </div>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default JobStatsCards;
