import JobSkeleton from "./JobSkeleton"
// import ProductLoadingCard from "./LoadingCard"


const JobsLoader = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
         <JobSkeleton/>
         <JobSkeleton/>
         <JobSkeleton/>
         <JobSkeleton/>
         <JobSkeleton/>
         <JobSkeleton/>
         <JobSkeleton/>
         <JobSkeleton/>
      
          </div>
  )
}

export default JobsLoader;