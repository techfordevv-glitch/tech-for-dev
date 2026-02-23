"use client";

import { useMemo, useState } from "react";
import { FaBell, FaDownload, FaUpload, FaCog, FaRss, FaMoon } from "react-icons/fa";
import { useUserData } from "@/components/UserDataProvider";

export default function SettingsPage() {
  const {
    preferences,
    updatePreferences,
    toggleSource,
    alerts,
    addAlert,
    removeAlert,
    exportData,
    importData,
  } = useUserData();

  const [keyword, setKeyword] = useState("");
  const [importText, setImportText] = useState("");
  const sourceKeys = useMemo(() => Object.keys(preferences.contentSources), [preferences.contentSources]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaCog className="me-2 text-primary" />Settings</h1>
          <p className="mb-0">Preferences, content sources, alerts, export/import and notification controls.</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3"><FaBell className="me-2 text-warning" />Notifications & Digest</h5>
                <div className="mb-3">
                  <label className="form-label">Email Digest</label>
                  <select
                    className="form-select"
                    value={preferences.emailDigest}
                    onChange={(e) => updatePreferences({ emailDigest: e.target.value })}
                  >
                    <option value="off">Off</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="form-check form-switch mb-2">
                  <input className="form-check-input" type="checkbox" checked={preferences.notifications} onChange={() => updatePreferences({ notifications: !preferences.notifications })} />
                  <label className="form-check-label">In-app notifications</label>
                </div>
                <div className="form-check form-switch mb-2">
                  <input className="form-check-input" type="checkbox" checked={preferences.pushNotifications} onChange={() => updatePreferences({ pushNotifications: !preferences.pushNotifications })} />
                  <label className="form-check-label">Push notifications</label>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" checked={preferences.darkModeSchedule} onChange={() => updatePreferences({ darkModeSchedule: !preferences.darkModeSchedule })} />
                  <label className="form-check-label"><FaMoon className="me-1" />Auto dark-mode schedule</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3"><FaRss className="me-2 text-info" />Content Sources</h5>
                <div className="row row-cols-2 g-2">
                  {sourceKeys.map((key) => (
                    <div className="col" key={key}>
                      <label className="d-flex align-items-center gap-2 border rounded px-2 py-2 small">
                        <input type="checkbox" checked={preferences.contentSources[key]} onChange={() => toggleSource(key)} />
                        <span className="text-capitalize">{key}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Keyword Alerts</h5>
                <div className="d-flex gap-2 mb-3">
                  <input className="form-control" placeholder="Add keyword (ai, react, rust...)" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addAlert(keyword);
                      setKeyword("");
                    }}
                  >Add</button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {alerts.map((a) => (
                    <button key={a} className="btn btn-sm btn-outline-primary" onClick={() => removeAlert(a)}>
                      {a} ×
                    </button>
                  ))}
                  {alerts.length === 0 && <span className="text-muted small">No keyword alerts yet.</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Data Portability</h5>
                <div className="d-flex gap-2 mb-3">
                  <button
                    className="btn btn-outline-success d-inline-flex align-items-center gap-2"
                    onClick={() => {
                      const blob = new Blob([exportData()], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "techfordev-export.json";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <FaDownload /> Export
                  </button>
                </div>
                <textarea
                  className="form-control mb-2"
                  rows={5}
                  placeholder="Paste exported JSON to import"
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                />
                <button
                  className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
                  onClick={() => {
                    const ok = importData(importText);
                    alert(ok ? "Import successful" : "Invalid JSON");
                  }}
                >
                  <FaUpload /> Import
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
