export default function CardSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-9 px-6 py-5 rounded-lg w-full bg-white [&>div]:animate-pulse ${className}`}
    >
      <div className="h-15 w-15 bg-gray-300 rounded-lg"></div>
      <div>
        <div className="h-5 w-[150px] bg-gray-300 rounded-full mb-5"></div>
        <div className="h-5 w-[100px] bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
