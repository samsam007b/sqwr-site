export default function ServicesLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 w-20 bg-secondary/10 rounded mb-10" />
          <div className="h-20 w-2/3 bg-secondary/8 rounded mb-4" />
          <div className="h-20 w-1/2 bg-secondary/5 rounded" />
        </div>
      </section>

      {/* Services grid skeleton */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-8 border border-secondary/10 rounded-lg space-y-4">
                <div className="h-8 w-8 bg-secondary/10 rounded" />
                <div className="h-5 w-3/4 bg-secondary/10 rounded" />
                <div className="h-3 bg-secondary/6 rounded w-full" />
                <div className="h-3 bg-secondary/6 rounded w-5/6" />
                <div className="h-3 bg-secondary/4 rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
