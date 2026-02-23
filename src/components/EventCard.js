"use client";

import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function EventCard({ event }) {
  if (!event) return null;

  const { id, name, date, location, type, url, description, tags, free } = event;

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-info bg-opacity-10 text-info small">{type}</span>
          {free && (
            <span className="badge bg-success bg-opacity-10 text-success small">Free</span>
          )}
        </div>

        <h6 className="card-title fw-bold">{name}</h6>

        <p className="card-text text-muted small flex-grow-1">
          {description?.substring(0, 120)}
          {description?.length > 120 ? "..." : ""}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {tags?.slice(0, 4).map((tag, i) => (
            <span key={i} className="badge bg-primary bg-opacity-10 text-primary small">
              {tag}
            </span>
          ))}
        </div>

        <div className="d-flex flex-column gap-1 mb-3 text-muted small">
          <span className="d-flex align-items-center gap-1">
            <FaCalendarAlt size={11} /> {date}
          </span>
          <span className="d-flex align-items-center gap-1">
            <FaMapMarkerAlt size={11} /> {location}
          </span>
        </div>

        {id && (
          <Link
            href={`/events/${id}`}
            className="btn btn-primary btn-sm mt-auto w-100 d-flex align-items-center justify-content-center gap-2"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
