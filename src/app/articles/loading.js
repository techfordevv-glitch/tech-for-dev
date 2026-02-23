import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="loading-skeleton" style={{ width: 200, height: 20, borderRadius: 8 }}></div>
          <div className="loading-skeleton mt-3" style={{ width: 300, height: 36, borderRadius: 8 }}></div>
          <div className="loading-skeleton mt-2" style={{ width: 400, height: 16, borderRadius: 8 }}></div>
        </div>
      </div>
      <div className="container py-4">
        <LoadingSkeleton count={12} />
      </div>
    </>
  );
}
