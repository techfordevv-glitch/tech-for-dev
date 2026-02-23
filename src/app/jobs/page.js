import { FaBriefcase } from "react-icons/fa";
import { fetchRemoteJobs } from "@/lib/newApis";
import JobCard from "@/components/JobCard";

export const metadata = {
  title: "Remote Developer Jobs",
  description: "Browse hundreds of remote software developer jobs from top tech companies worldwide. Find full-stack, frontend, backend, DevOps, and AI engineering positions — updated daily.",
  keywords: ["remote developer jobs", "remote software jobs", "work from home programming", "remote full stack", "remote frontend", "remote backend", "remote devops", "tech jobs 2025"],
  openGraph: {
    title: "Remote Developer Jobs | TechForDev",
    description: "Hundreds of remote software jobs — full-stack, frontend, backend, DevOps, AI. Fresh listings daily.",
    type: "website",
    url: "/jobs",
    images: [{ url: "/api/og?title=Remote+Dev+Jobs&desc=Frontend%2C+Backend%2C+DevOps%2C+AI+positions", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote Developer Jobs | TechForDev",
    description: "Hundreds of remote software jobs — full-stack, frontend, backend, DevOps.",
  },
  alternates: { canonical: "/jobs" },
};

export const revalidate = 3600;

export default async function JobsPage() {
  const [devJobs, designJobs, devopsJobs] = await Promise.all([
    fetchRemoteJobs("software-dev", 12),
    fetchRemoteJobs("design", 6),
    fetchRemoteJobs("devops", 6),
  ]);

  const sections = [
    { title: "Software Development", jobs: devJobs, color: "primary" },
    { title: "Design & UX", jobs: designJobs, color: "info" },
    { title: "DevOps & Sysadmin", jobs: devopsJobs, color: "success" },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="text-white">
            <FaBriefcase className="me-2 text-primary" /> Remote Developer Jobs
          </h1>
          <p>Find your next remote tech opportunity from top companies</p>
        </div>
      </div>

      <div className="container py-5">
        {sections.map((section) => (
          <section key={section.title} className="mb-5">
            <h2 className="section-header mb-4">
              <span className={`icon bg-${section.color} bg-opacity-10 text-${section.color}`}>
                <FaBriefcase />
              </span>
              {section.title}
            </h2>
            <div className="row g-4">
              {section.jobs.length > 0 ? (
                section.jobs.map((job) => (
                  <div key={job.id} className="col-md-6 col-lg-4">
                    <JobCard job={job} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted py-4">
                  <p>No jobs available right now. Check back later.</p>
                </div>
              )}
            </div>
            <hr className="section-divider" />
          </section>
        ))}

        <div className="text-center mt-4">
          <a
            href="https://remotive.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary px-4"
          >
            Browse All Jobs on Remotive
          </a>
        </div>
      </div>
    </>
  );
}
