import { FaGithub, FaTwitter, FaEnvelope, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import PushNotification from "./PushNotification";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5" data-bs-theme="dark">
      <div className="container">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src="/icons/icon.svg" alt="TechForDev" width={28} height={28} style={{ borderRadius: 7 }} />
              <h5 className="mb-0 fw-bold">TechForDev</h5>
            </div>
            <p className="text-white small">
              Your daily source for tech news, AI tools, developer articles, and
              trending projects. Auto-updated, always fresh.
            </p>
            <Link
              href="/about"
              className="btn btn-sm d-inline-flex align-items-center gap-2 mt-1"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.12)", fontSize: 13 }}
            >
              <FaInfoCircle size={12} /> About Us
            </Link>
          </div>

          {/* Explore */}
          <div className="col-lg-2 col-md-4">
            <h6 className="fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/news" className="text-white text-decoration-none small">Tech News</Link>
              </li>
              <li className="mb-2">
                <Link href="/ai-tools" className="text-white text-decoration-none small">AI Tools</Link>
              </li>
              <li className="mb-2">
                <Link href="/free-apis" className="text-white text-decoration-none small">Free APIs</Link>
              </li>
              <li className="mb-2">
                <Link href="/ai-models" className="text-white text-decoration-none small">AI Models</Link>
              </li>
              <li className="mb-2">
                <Link href="/articles" className="text-white text-decoration-none small">Articles</Link>
              </li>
              <li className="mb-2">
                <Link href="/projects" className="text-white text-decoration-none small">Projects</Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div className="col-lg-2 col-md-4">
            <h6 className="fw-bold mb-3">More</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/videos" className="text-white text-decoration-none small">Videos</Link></li>
              <li className="mb-2"><Link href="/jobs" className="text-white text-decoration-none small">Remote Jobs</Link></li>
              <li className="mb-2"><Link href="/reddit" className="text-white text-decoration-none small">Reddit</Link></li>
              <li className="mb-2"><Link href="/events" className="text-white text-decoration-none small">Events</Link></li>
              <li className="mb-2"><Link href="/roadmaps" className="text-white text-decoration-none small">Roadmaps</Link></li>
              <li className="mb-2"><Link href="/challenges" className="text-white text-decoration-none small">Challenges</Link></li>
              <li className="mb-2"><Link href="/salary" className="text-white text-decoration-none small">Salary Data</Link></li>
              <li className="mb-2"><Link href="/polls" className="text-white text-decoration-none small">Dev Polls</Link></li>
              <li className="mb-2"><Link href="/compare" className="text-white text-decoration-none small">Compare Tech</Link></li>
              <li className="mb-2"><Link href="/profile" className="text-white text-decoration-none small">My Profile</Link></li>
            </ul>
          </div>

          {/* Other */}
          <div className="col-lg-2 col-md-4">
            <h6 className="fw-bold mb-3">Other</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/extensions" className="text-white text-decoration-none small">Extensions</Link>
              </li>
              <li className="mb-2">
                <Link href="/mobile" className="text-white text-decoration-none small">Mobile App</Link>
              </li>
              <li className="mb-2">
                <Link href="/premium" className="text-white text-decoration-none small">Premium</Link>
              </li>
              <li className="mb-2">
                <Link href="/community" className="text-white text-decoration-none small">Community</Link>
              </li>
              <li className="mb-2">
                <Link href="/integrations" className="text-white text-decoration-none small">Integrations</Link>
              </li>
              <li className="mb-2">
                <Link href="/settings" className="text-white text-decoration-none small">Settings</Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-lg-3 col-md-4">
            <h6 className="fw-bold mb-3">Connect</h6>
            <div className="d-flex gap-3 mb-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white fs-5">
                <FaGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white fs-5">
                <FaTwitter />
              </a>
              <a href="mailto:contact@techfordev.com" className="text-white fs-5">
                <FaEnvelope />
              </a>
            </div>
            <div className="d-flex flex-wrap gap-1">
              <span className="badge bg-light text-dark border small">/ search</span>
              <span className="badge bg-light text-dark border small">Alt+D theme</span>
              <span className="badge bg-light text-dark border small">n news</span>
              <span className="badge bg-light text-dark border small">r roadmaps</span>
              <span className="badge bg-light text-dark border small">c challenges</span>
              <span className="badge bg-light text-dark border small">? help</span>
            </div>
            <div className="mt-3">
              <NewsletterForm />
            </div>
            <div className="mt-3">
              <PushNotification />
            </div>
          </div>

        </div>

        <hr className="border-secondary my-4" />
        <div className="d-flex flex-wrap justify-content-between align-items-center text-white small gap-2">
          <span>&copy; {new Date().getFullYear()} TechForDev. All rights reserved.</span>
          <div className="d-flex gap-3">
            <Link href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-white text-decoration-none">Terms of Service</Link>
            <Link href="/cookie-policy" className="text-white text-decoration-none">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
