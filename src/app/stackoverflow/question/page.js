import { Suspense } from "react";
import { fetchStackOverflow } from "@/lib/newApis";
import SOCard from "@/components/SOCard";
import { FaStackOverflow } from "react-icons/fa";
import SODetailContent from "./SODetailContent";

export const metadata = {
  title: "Stack Overflow Question",
  description: "Read and explore Stack Overflow programming questions and answers on TechForDev.",
  robots: { index: false, follow: true },
};

export const revalidate = 1800;

export default async function SODetailPage() {
  const relatedQuestions = await fetchStackOverflow("", 1, 9);

  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="loading-skeleton mx-auto" style={{ maxWidth: 800, height: 400 }}></div>
        </div>
      }
    >
      <SODetailContent />

      <div className="container pb-5">
        <hr className="section-divider" />
        <section>
          <h4 className="section-header">
            <span className="icon bg-warning bg-opacity-10 text-warning">
              <FaStackOverflow />
            </span>
            More Trending Questions
          </h4>
          {relatedQuestions.length > 0 ? (
            <div className="row g-4">
              {relatedQuestions.slice(0, 6).map((q, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <SOCard question={q} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">Explore more trending questions from Stack Overflow</p>
          )}
        </section>
      </div>
    </Suspense>
  );
}
