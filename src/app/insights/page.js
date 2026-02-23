"use client";

import { FaChartLine, FaBookmark, FaFolderOpen, FaBell } from "react-icons/fa";
import { useBookmarks } from "@/components/BookmarkProvider";
import { useUserData } from "@/components/UserDataProvider";

export default function InsightsPage() {
  const { bookmarks } = useBookmarks();
  const { collections, alerts, preferences } = useUserData();

  const byType = bookmarks.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  const sourceEnabled = Object.values(preferences.contentSources).filter(Boolean).length;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaChartLine className="me-2 text-primary" />Insights</h1>
          <p className="mb-0">Personal analytics, saved trends, and preference coverage.</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 mb-4">
          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-number">{bookmarks.length}</div>
              <div className="stat-label"><FaBookmark className="me-1" />Total Saved</div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-number">{collections.length}</div>
              <div className="stat-label"><FaFolderOpen className="me-1" />Collections</div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-number">{alerts.length}</div>
              <div className="stat-label"><FaBell className="me-1" />Keyword Alerts</div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Saved Content Mix</h5>
                {Object.keys(byType).length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {Object.entries(byType)
                      .sort((a, b) => b[1] - a[1])
                      .map(([type, count]) => (
                        <div className="d-flex justify-content-between border rounded px-3 py-2" key={type}>
                          <span className="text-capitalize">{type}</span>
                          <span className="fw-bold">{count}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted mb-0">No saved data yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Personalization Health</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Enabled Sources</span>
                    <strong>{sourceEnabled} / {Object.keys(preferences.contentSources).length}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Email Digest</span>
                    <strong className="text-capitalize">{preferences.emailDigest}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Push Notifications</span>
                    <strong>{preferences.pushNotifications ? "On" : "Off"}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Dark Mode Schedule</span>
                    <strong>{preferences.darkModeSchedule ? "On" : "Off"}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
