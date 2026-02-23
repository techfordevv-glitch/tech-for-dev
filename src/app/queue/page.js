"use client";

import Link from "next/link";
import { FaListOl, FaTrash, FaExternalLinkAlt, FaClock } from "react-icons/fa";
import { useUserData } from "@/components/UserDataProvider";
import { timeAgo } from "@/lib/api";

export default function QueuePage() {
  const { readQueue, removeFromQueue } = useUserData();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaListOl className="me-2 text-primary" />Read Queue</h1>
          <p className="mb-0">Your personal reading queue for later.</p>
        </div>
      </div>

      <div className="container py-5">
        {readQueue.length > 0 ? (
          <div className="row g-4">
            {readQueue.map((item) => {
              const key = `${item.type}-${item.id || item.url || item.title}`;
              return (
                <div className="col-md-6 col-lg-4" key={key}>
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="badge bg-primary bg-opacity-10 text-primary">{item.type}</span>
                        <small className="text-muted d-flex align-items-center gap-1"><FaClock size={10} /> {timeAgo(item.queuedAt)}</small>
                      </div>
                      <h6 className="fw-bold flex-grow-1">{item.title}</h6>
                      <div className="d-flex gap-2 mt-auto">
                        {item.url && (
                          <Link href={item.url} className="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1">
                            Open <FaExternalLinkAlt size={9} />
                          </Link>
                        )}
                        <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromQueue(key)}>
                          <FaTrash size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5 text-muted">
            <FaListOl size={48} className="opacity-25 mb-3" />
            <h5>No items in queue</h5>
            <p>Add items from Saved page.</p>
            <Link href="/saved" className="btn btn-primary">Go to Saved</Link>
          </div>
        )}
      </div>
    </>
  );
}
