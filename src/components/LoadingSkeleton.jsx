function SkeletonCard() {
  return (
    <div className="bg-surface border border-line rounded-xl p-5 animate-pulse">
      <div className="h-5 w-2/3 bg-line rounded mb-3" />
      <div className="h-4 w-full bg-line rounded mb-2" />
      <div className="h-4 w-5/6 bg-line rounded mb-4" />
      <div className="h-9 w-40 bg-line rounded-lg" />
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading assignments"
      className="max-w-4xl mx-auto p-4 sm:p-8"
    >
      <div className="h-8 w-56 bg-line rounded mb-6 animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((n) => (
          <SkeletonCard key={n} />
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton