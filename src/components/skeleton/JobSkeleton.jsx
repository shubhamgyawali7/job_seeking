// JobCardSkeleton.jsx
export default function JobSkeleton() {
  return (
    <div className="w-full max-w-md p-6 rounded-lg bg-gray-100 animate-pulse space-y-4">
      {/* Title */}
      <div className="h-5 w-2/3 bg-gray-300 rounded"></div>

      {/* Info Rows */}
      <div className="h-4 w-full bg-gray-300 rounded"></div>
      <div className="h-4 w-full bg-gray-300 rounded"></div>
      <div className="h-4 w-full bg-gray-300 rounded"></div>
      <div className="h-4 w-full bg-gray-300 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}