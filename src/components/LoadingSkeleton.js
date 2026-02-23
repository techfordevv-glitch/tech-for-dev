export default function LoadingSkeleton({ count = 6, height = 300 }) {
  return (
    <div className="row g-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="col-md-6 col-lg-4">
          <div className="skeleton-card" style={{ height }}>
            <div className="skeleton-image" />
            <div className="skeleton-body">
              <div className="skeleton-line w-75" />
              <div className="skeleton-line w-100" />
              <div className="skeleton-line w-50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
