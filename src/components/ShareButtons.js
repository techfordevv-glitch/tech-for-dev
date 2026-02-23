"use client";

import { FaTwitter, FaLinkedin, FaWhatsapp, FaLink, FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function ShareButtons({ url, title, description = "" }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const shareLinks = [
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "#1da1f2",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#0a66c2",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25d366",
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-buttons d-flex align-items-center gap-2 flex-wrap">
      <span className="text-muted small me-1">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          style={{ "--share-color": link.color }}
          title={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        onClick={copyLink}
        className={`share-btn ${copied ? "copied" : ""}`}
        style={{ "--share-color": copied ? "#10b981" : "#64748b" }}
        title="Copy link"
      >
        {copied ? <FaCheck /> : <FaLink />}
      </button>
    </div>
  );
}
