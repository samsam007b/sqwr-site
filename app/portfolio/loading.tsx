export default function PortfolioLoading() {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-16 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Hero skeleton */}
        <div className="h-3 w-20 bg-secondary/10 rounded mb-12" />
        <div className="h-16 w-2/3 bg-secondary/8 rounded mb-4" />
        <div className="h-16 w-1/2 bg-secondary/5 rounded mb-16" />

        {/* Filter pills skeleton */}
        <div className="flex gap-3 mb-16">
          {[80, 60, 90, 70, 65].map((w, i) => (
            <div key={i} className="h-7 rounded" style={{ width: w, backgroundColor: 'rgba(102,102,102,0.08)' }} />
          ))}
        </div>

        {/* Project cards skeleton */}
        <div className="space-y-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-secondary/10 py-12 grid grid-cols-12 gap-8 items-center">
              <div className="col-span-5 lg:col-span-3">
                <div className="aspect-[4/3] bg-secondary/8 rounded" />
              </div>
              <div className="col-span-7 lg:col-span-9 space-y-4">
                <div className="h-3 w-24 bg-secondary/8 rounded" />
                <div className="h-8 w-3/4 bg-secondary/10 rounded" />
                <div className="h-4 w-1/2 bg-secondary/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
