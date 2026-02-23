import { FaCalendarAlt } from "react-icons/fa";
import { getTechEvents } from "@/lib/newApis";
import EventCard from "@/components/EventCard";

export const metadata = {
  title: "Tech Events & Conferences",
  description: "Discover upcoming tech events, developer conferences, hackathons, and workshops in 2026. Find AI summits, web dev conferences, and open-source meetups near you.",
  keywords: ["tech events", "developer conferences", "hackathons 2026", "AI summit", "web development conference", "tech meetups", "programming workshops"],
  openGraph: {
    title: "Upcoming Tech Events & Conferences | TechForDev",
    description: "AI summits, web dev conferences, hackathons and developer meetups happening in 2026.",
    type: "website",
    url: "/events",
    images: [{ url: "/api/og?title=Tech+Events&desc=Conferences%2C+hackathons+%26+developer+meetups", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Tech Events & Conferences | TechForDev",
    description: "AI summits, web dev conferences, hackathons and developer meetups in 2026.",
  },
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const events = getTechEvents();
  const conferences = events.filter((e) => e.type === "Conference");
  const others = events.filter((e) => e.type !== "Conference");

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="text-white">
            <FaCalendarAlt className="me-2 text-info" /> Tech Events & Conferences
          </h1>
          <p>Don&apos;t miss the biggest tech events of 2026</p>
        </div>
      </div>

      <div className="container py-5">
        <section className="mb-5">
          <h2 className="section-header mb-4">
            <span className="icon bg-primary bg-opacity-10 text-primary">
              <FaCalendarAlt />
            </span>
            Developer Conferences
          </h2>
          <div className="row g-4">
            {conferences.map((event) => (
              <div key={event.id} className="col-md-6 col-lg-4">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {others.length > 0 && (
          <section className="mb-5">
            <h2 className="section-header mb-4">
              <span className="icon bg-warning bg-opacity-10 text-warning">
                <FaCalendarAlt />
              </span>
              Hackathons & Summits
            </h2>
            <div className="row g-4">
              {others.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
