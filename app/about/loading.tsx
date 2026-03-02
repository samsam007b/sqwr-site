export default function AboutLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 w-16 bg-secondary/10 rounded mb-10" />
          <div className="h-20 w-3/4 bg-secondary/8 rounded mb-4" />
          <div className="h-20 w-2/3 bg-secondary/5 rounded" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="h-4 bg-secondary/8 rounded w-full" />
            <div className="h-4 bg-secondary/8 rounded w-5/6" />
            <div className="h-4 bg-secondary/8 rounded w-4/5" />
            <div className="h-4 bg-secondary/5 rounded w-full" />
            <div className="h-4 bg-secondary/5 rounded w-3/4" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="aspect-square bg-secondary/8 rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
