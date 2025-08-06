const JobSkeleton = () => {
  return (
    <div className="border overflow-hidden py-4 px-6 bg-white rounded-xl relative h-100 animate-pulse">
      <div className="flex w-500 h-40  justify-center items-center gap-6">
        <div className="bg-slate-200 w-30 h-30 rounded-full"></div>
        <div className="bg-slate-200 w-full h-1/2 "></div>
      </div>
      <div className="bg-slate-200 w-4/5 h-4 mt-3"></div>
      <div className="bg-slate-200 w-4/5 h-4 my-3"></div>
      <div className="bg-slate-200 w-4/5 h-4 my-3"></div>
      <div className="bg-slate-200 w-2/5 h-6 my-7"></div>
      <div className="bg-slate-200 w-2/5 h-6 "></div>
    </div>
  );
};

export default JobSkeleton;
