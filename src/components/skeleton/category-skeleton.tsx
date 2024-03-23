import ChevronIcon from "../../assets/icons/chevron";

export default function CategorySkeleton() {
  return (
    <div className="w-full gap-3 px-5 py-6 flex items-center bg-neutral-8 rounded-lg [&>div]:animate-pulse">
      <ChevronIcon className="w-4 h-4 text-neutral-1 -rotate-90" />
      <div className="h-5 my-4 w-[100px] bg-gray-300 rounded-lg"></div>
    </div>
  );
}
