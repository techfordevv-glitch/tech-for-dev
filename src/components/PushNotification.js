"use client";
import { useState, useEffect } from "react";
import { FaBell, FaBellSlash, FaCheckCircle } from "react-icons/fa";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export default function PushNotification() {
  const [status, setStatus] = useState("idle"); // idle | requesting | subscribed | denied | unsupported
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    // Check if already subscribed
    navigator.serviceWorker.ready.then((reg) =>
      reg.pushManager.getSubscription().then((sub) => {
        if (sub) setStatus("subscribed");
      })
    );
  }, []);

  async function subscribe() {
    if (status === "requesting") return;
    setStatus("requesting");
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setStatus("denied");
        setMsg("Notifications blocked. Enable in browser settings.");
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });

      if (res.ok) {
        setStatus("subscribed");
        setMsg("You'll receive push notifications for new content!");
      } else {
        setStatus("idle");
        setMsg("Subscription failed. Please try again.");
      }
    } catch (err) {
      console.error("Push subscribe error:", err);
      setStatus("idle");
      setMsg("Could not subscribe. Please try again.");
    }
  }

  if (status === "unsupported") return null;

  if (status === "subscribed") {
    return (
      <div className="d-flex align-items-center gap-2 small" style={{ color: "#22c55e" }}>
        <FaCheckCircle size={13} />
        <span>Notifications on</span>
      </div>
    );
  }

  return (
    <div>
      <button
        className="btn btn-sm d-flex align-items-center gap-2"
        style={{
          background: status === "denied"
            ? "rgba(239,68,68,0.12)"
            : "rgba(251,191,36,0.12)",
          border: status === "denied"
            ? "1px solid rgba(239,68,68,0.3)"
            : "1px solid rgba(251,191,36,0.3)",
          color: status === "denied" ? "#ef4444" : "#f59e0b",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
        }}
        onClick={subscribe}
        disabled={status === "requesting" || status === "denied"}
      >
        {status === "requesting" ? (
          <><span className="spinner-border spinner-border-sm" /> Enabling...</>
        ) : status === "denied" ? (
          <><FaBellSlash size={12} /> Blocked</>
        ) : (
          <><FaBell size={12} /> Enable Alerts</>
        )}
      </button>
      {msg && (
        <p className="mt-1 mb-0" style={{ fontSize: 11, color: "var(--text-secondary)" }}>{msg}</p>
      )}
    </div>
  );
}
