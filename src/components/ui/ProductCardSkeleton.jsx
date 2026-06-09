export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-green-100 overflow-hidden h-full flex flex-col animate-pulse"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      {/* Image area */}
      <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-green-100" />

      {/* Info area */}
      <div className="p-2.5 sm:p-3.5 flex flex-col gap-2 flex-1">
        {/* Origin */}
        <div className="h-2.5 w-20 bg-green-100 rounded-full" />
        {/* Name */}
        <div className="h-3.5 w-full bg-green-100 rounded-full" />
        <div className="h-3.5 w-3/4 bg-green-100 rounded-full" />
        {/* Stars */}
        <div className="h-2.5 w-24 bg-green-100 rounded-full" />
        <div className="flex-1" />
        {/* Price row */}
        <div className="flex items-center justify-between mt-2">
          <div className="h-4 w-16 bg-green-100 rounded-full" />
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100" />
        </div>
      </div>
    </div>
  )
}
