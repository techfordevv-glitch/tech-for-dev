import { FaStackOverflow, FaArrowRight } from "react-icons/fa";
import { fetchStackOverflow } from "@/lib/newApis";
import SOCard from "@/components/SOCard";

export const metadata = {
  title: "Stack Overflow Trending Questions",
  description: "Browse trending and hottest Stack Overflow questions on JavaScript, Python, React, SQL, and more. Find answers to real developer problems from the world's largest coding community.",
  keywords: ["stack overflow", "programming questions", "javascript help", "python questions", "react questions", "coding problems", "developer Q&A"],
  openGraph: {
    title: "Trending Stack Overflow Questions | TechForDev",
    description: "Hottest programming Q&A from Stack Overflow — JS, Python, React, SQL and more.",
    type: "website",
    url: "/stackoverflow",
    images: [{ url: "/api/og?title=Stack+Overflow+Trending&desc=Hot+programming+questions+%26+answers", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Stack Overflow Questions | TechForDev",
    description: "Hottest programming Q&A — JS, Python, React, SQL.",
  },
  alternates: { canonical: "/stackoverflow" },
};

export const revalidate = 1800;

export default async function StackOverflowPage() {
  const [general, js, python, react] = await Promise.all([
    fetchStackOverflow("", 1, 6),
    fetchStackOverflow("javascript", 1, 6),
    fetchStackOverflow("python", 1, 6),
    fetchStackOverflow("reactjs", 1, 6),
  ]);

  const sections = [
    { title: "Hot Questions", tag: "", posts: general },
    { title: "JavaScript", tag: "javascript", posts: js },
    { title: "Python", tag: "python", posts: python },
    { title: "React", tag: "reactjs", posts: react },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="text-white">
            <FaStackOverflow className="me-2 text-warning" /> Stack Overflow Trending
          </h1>
          <p>Hottest questions from the developer community</p>
        </div>
      </div>

      <div className="container py-5">
        {sections.map((section) => (
          <section key={section.title} className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-header mb-0">
                <span className="icon bg-warning bg-opacity-10 text-warning">
                  <FaStackOverflow />
                </span>
                {section.title}
              </h2>
              <a
                href={`https://stackoverflow.com/questions/tagged/${section.tag}?tab=Hot`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
              >
                View on SO <FaArrowRight size={10} />
              </a>
            </div>
            <div className="row g-4">
              {section.posts.length > 0 ? (
                section.posts.map((q) => (
                  <div key={q.question_id} className="col-md-6 col-lg-4">
                    <SOCard question={q} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted py-4">
                  <p>Unable to load questions. Try again later.</p>
                </div>
              )}
            </div>
            <hr className="section-divider" />
          </section>
        ))}
      </div>
    </>
  );
}
