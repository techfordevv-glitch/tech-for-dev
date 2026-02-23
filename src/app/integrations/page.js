"use client";

import { useState } from "react";
import { FaSlack, FaDiscord, FaTelegram, FaPlug } from "react-icons/fa";

export default function IntegrationsPage() {
  const [slack, setSlack] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");

  const save = () => {
    localStorage.setItem(
      "techfordev-integrations",
      JSON.stringify({ slack, discord, telegram, savedAt: new Date().toISOString() })
    );
    alert("Integration endpoints saved (MVP local mode)");
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaPlug className="me-2 text-primary" />Integrations</h1>
          <p className="mb-0">Connect Slack, Discord, and Telegram webhooks for alerts.</p>
        </div>
      </div>
      <div className="container py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label"><FaSlack className="me-2 text-success" />Slack Webhook URL</label>
              <input className="form-control" value={slack} onChange={(e) => setSlack(e.target.value)} placeholder="https://hooks.slack.com/..." />
            </div>
            <div className="mb-3">
              <label className="form-label"><FaDiscord className="me-2 text-info" />Discord Webhook URL</label>
              <input className="form-control" value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder="https://discord.com/api/webhooks/..." />
            </div>
            <div className="mb-3">
              <label className="form-label"><FaTelegram className="me-2 text-primary" />Telegram Bot Endpoint</label>
              <input className="form-control" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="https://api.telegram.org/bot..." />
            </div>
            <button className="btn btn-primary" onClick={save}>Save Integrations</button>
          </div>
        </div>
      </div>
    </>
  );
}
