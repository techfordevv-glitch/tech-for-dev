import { Suspense } from "react";
import { fetchRemoteJobs } from "@/lib/newApis";
import JobCard from "@/components/JobCard";
import { FaBriefcase } from "react-icons/fa";
import JobDetailContent from "./JobDetailContent";

export const metadata = {
  title: "Remote Developer Job",
  description: "View remote software developer job details on TechForDev. Apply directly to top tech companies hiring remotely.",
  robots: { index: false, follow: true },
};

export const revalidate = 3600;

export default async function JobDetailPage() {
  const relatedJobs = await fetchRemoteJobs("software-dev", 9);

  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="loading-skeleton mx-auto" style={{ maxWidth: 800, height: 400 }}></div>
        </div>
      }
    >
      <JobDetailContent />

      <div className="container pb-5">
        <hr className="section-divider" />
        <section>
          <h4 className="section-header">
            <span className="icon bg-success bg-opacity-10 text-success">
              <FaBriefcase />
            </span>
            More Remote Jobs
          </h4>
          {relatedJobs.length > 0 ? (
            <div className="row g-4">
              {relatedJobs.slice(0, 6).map((job, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">Browse more remote developer jobs</p>
          )}
        </section>
      </div>
    </Suspense>
  );
}
