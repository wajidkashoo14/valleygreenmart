export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-green-100 overflow-hidden">
      {/* Matches aspect-[4/3] image */}
      <div className="aspect-[4/3] skeleton" />
      <div className="p-2.5 sm:p-3.5 space-y-2">
        <div className="h-2 skeleton rounded-full w-1/3" />
        <div className="h-3 skeleton rounded-full w-5/6" />
        <div className="h-3 skeleton rounded-full w-3/4" />
        <div className="h-2.5 skeleton rounded-full w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-4 skeleton rounded-full w-1/3" />
          <div className="h-7 w-7 sm:h-8 sm:w-8 skeleton rounded-full" />
        </div>
      </div>
    </div>
  )
}
