export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-green-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-green-100" />
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 bg-green-100 rounded-full w-1/3" />
        <div className="h-3.5 bg-green-100 rounded-full w-4/5" />
        <div className="h-3 bg-green-100 rounded-full w-2/3" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-4 bg-green-100 rounded-full w-1/4" />
          <div className="h-8 w-8 bg-green-100 rounded-full" />
        </div>
      </div>
    </div>
  )
}
