function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-30 rounded-xl bg-[#232323] border border-[#515151]
                     p-6 flex flex-col justify-between animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 rounded bg-[#3A3A3A]" />
            <div className="h-7 w-7 rounded bg-[#3A3A3A]" />
          </div>

          <div className="h-4 w-24 rounded bg-[#3A3A3A]" />
        </div>
      ))}
    </div>
  );
}

export default CategorySkeleton;
