export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050810] font-sans">
      {/* Breadcrumb Skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 py-[14px] border-b border-[rgba(255,255,255,0.06)] flex gap-2">
        <div className="w-12 h-4 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
        <div className="w-16 h-4 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
        <div className="w-24 h-4 bg-[rgba(236,72,153,0.1)] rounded animate-pulse" />
      </div>

      {/* Hero Skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="w-32 h-6 bg-[rgba(236,72,153,0.1)] rounded animate-pulse" />
          <div className="w-3/4 h-16 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
          <div className="w-full h-24 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="w-40 h-12 bg-[rgba(236,72,153,0.1)] rounded-lg animate-pulse" />
            <div className="w-40 h-12 bg-[rgba(255,255,255,0.05)] rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="lg:col-span-5 hidden lg:block">
          <div className="w-full h-[400px] bg-[#0D1321] rounded-2xl border border-[rgba(255,255,255,0.05)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
