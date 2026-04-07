function ProductSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-57">
          <div
            className="h-52.5 bg-[#232323] border border-[#515151]
                       rounded-[10px] p-4 flex flex-col justify-between
                       animate-pulse"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-5 w-40 rounded bg-[#3A3A3A]" />
                <div className="h-4 w-50 rounded bg-[#3A3A3A]" />
                <div className="h-4 w-48 rounded bg-[#3A3A3A]" />
              </div>

              <div className="h-10 w-10 rounded-md bg-[#3A3A3A]" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-3 w-3 rounded bg-[#3A3A3A]" />
                ))}
              </div>

              <div className="h-5 w-20 rounded bg-[#3A3A3A]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductSkeleton;
