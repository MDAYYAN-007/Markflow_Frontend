export default function CategorySkeleton2() {
  return (
    <div
      className="rounded-xl bg-[#232323] border border-[#515151]
                 px-6 py-4 flex items-center justify-between
                 animate-pulse"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="h-10 w-10 rounded-md bg-[#2A2A2A]" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-[#2A2A2A] rounded" />
          <div className="h-3 w-2/3 bg-[#2A2A2A] rounded" />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="h-8 w-8 rounded-md bg-[#2A2A2A]" />
        <div className="h-8 w-8 rounded-md bg-[#2A2A2A]" />
        <div className="h-8 w-8 rounded-md bg-[#2A2A2A]" />
      </div>
    </div>
  );
}
