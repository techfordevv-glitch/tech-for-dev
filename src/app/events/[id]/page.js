import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import { getTechEvents } from "@/lib/newApis";
import EventCard from "@/components/EventCard";
import ShareButtons from "@/components/ShareButtons";

export function generateStaticParams() {
  const events = getTechEvents();
  return events.map((event) => ({ id: String(event.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const events = getTechEvents();
  const event = events.find((e) => e.id === Number(id));
  if (!event) return { title: "Event Not Found" };
  const desc = event.description?.slice(0, 155) || `${event.name} — tech event details on TechForDev`;
  return {
    title: event.name,
    description: desc,
    keywords: [event.name, "tech event", "developer conference", event.location || "online", "2026"],
    openGraph: {
      title: event.name,
      description: desc,
      type: "website",
      url: `/events/${id}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(event.name)}&desc=${encodeURIComponent(desc)}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: event.name, description: desc },
    alternates: { canonical: `/events/${id}` },
  };
}

export default async function EventDetailPage({ params }) {
  const { id } = await params;
  const events = getTechEvents();
  const event = events.find((e) => e.id === Number(id));
  if (!event) notFound();

  const relatedEvents = events
    .filter((e) => e.id !== event.id && (e.type === event.type || e.tags.some(t => event.tags.includes(t))))
    .slice(0, 6);

  const eventUrl = `https://techfordev.dev/events/${id}`;

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/events"
            className="btn btn-outline-primary btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Events
          </Link>
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 fs-6">
              {event.type}
            </span>
            {event.free && (
              <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 fs-6">
                Free
              </span>
            )}
          </div>
          <h1 style={{ maxWidth: 800 }}>{event.name}</h1>
          <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
            <span className="text-secondary d-flex align-items-center gap-1">
              <FaCalendarAlt size={14} /> {event.date}
            </span>
            <span className="text-secondary d-flex align-items-center gap-1">
              <FaMapMarkerAlt size={14} /> {event.location}
            </span>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Description */}
            <section className="mb-5">
              <h4 className="fw-bold mb-3">About This Event</h4>
              <p className="text-secondary" style={{ fontSize: "1.15rem", lineHeight: 1.9 }}>
                {event.description}
              </p>
            </section>

            {/* Tags */}
            <section className="mb-5">
              <h4 className="fw-bold mb-3">
                <FaTag className="text-primary me-2" size={16} />
                Topics Covered
              </h4>
              <div className="d-flex flex-wrap gap-2">
                {event.tags.map((tag, i) => (
                  <span key={i} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 fs-6">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Event Details */}
            <section className="mb-5">
              <h4 className="fw-bold mb-3">Event Details</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <h6 className="text-muted small text-uppercase mb-2">When</h6>
                    <div className="d-flex align-items-center gap-2">
                      <FaCalendarAlt className="text-info" />
                      <span className="fw-semibold">{event.date}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <h6 className="text-muted small text-uppercase mb-2">Where</h6>
                    <div className="d-flex align-items-center gap-2">
                      <FaMapMarkerAlt className="text-danger" />
                      <span className="fw-semibold">{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <h6 className="text-muted small text-uppercase mb-2">Type</h6>
                    <div className="d-flex align-items-center gap-2">
                      <FaUsers className="text-primary" />
                      <span className="fw-semibold">{event.type}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <h6 className="text-muted small text-uppercase mb-2">Price</h6>
                    <div className="d-flex align-items-center gap-2">
                      <FaGlobe className="text-success" />
                      <span className="fw-semibold">{event.free ? "Free" : "Paid"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Share Buttons */}
            <div className="mb-4">
              <ShareButtons url={eventUrl} title={event.name} description={event.description} />
            </div>

            {/* Register CTA */}
            <div
              className="p-4 rounded-3 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)",
                border: "1px solid rgba(59,130,246,0.15)",
              }}
            >
              <FaCalendarAlt size={30} className="text-primary mb-3" />
              <h5 className="fw-bold mb-2">Don&apos;t Miss Out!</h5>
              <p className="text-secondary mb-3">
                Register now for {event.name} — {event.date}
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary px-5 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
                >
                  Register Now <FaExternalLinkAlt size={12} />
                </a>
                <Link
                  href="/events"
                  className="btn btn-outline-primary px-5 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
                >
                  View Events
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div
              className="p-4 rounded-3 mb-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "sticky",
                top: 80,
              }}
            >
              {/* Date */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Date</h6>
                <div className="d-flex align-items-center gap-2 fs-5">
                  <FaCalendarAlt className="text-info" />
                  <span className="fw-bold">{event.date}</span>
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Location</h6>
                <div className="d-flex align-items-center gap-2">
                  <FaMapMarkerAlt className="text-danger" size={14} />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Type */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Event Type</h6>
                <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                  {event.type}
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Pricing</h6>
                <span className={`badge ${event.free ? "bg-success" : "bg-warning"} bg-opacity-10 ${event.free ? "text-success" : "text-warning"} px-3 py-2`}>
                  {event.free ? "🎉 Free" : "💳 Paid"}
                </span>
              </div>

              <hr style={{ borderColor: "rgba(255,255,255,0.06)" }} />

              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              >
                Visit Website <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <>
            <hr className="section-divider" />
            <section>
              <h4 className="section-header">
                <span className="icon bg-info bg-opacity-10 text-info">
                  <FaCalendarAlt />
                </span>
                Related Events
              </h4>
              <div className="row g-4">
                {relatedEvents.map((e) => (
                  <div key={e.id} className="col-md-6 col-lg-4">
                    <EventCard event={e} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
