import { NextResponse } from "next/server";
import webpush from "web-push";

// In-memory store (resets on server restart — use a DB in production)
global._pushSubscriptions = global._pushSubscriptions || [];

webpush.setVapidDetails(
  process.env.VAPID_EMAIL || "mailto:admin@techfordev.vercel.app",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

export async function POST(req) {
  try {
    const subscription = await req.json();
    if (!subscription?.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }

    // Avoid duplicates
    const exists = global._pushSubscriptions.some((s) => s.endpoint === subscription.endpoint);
    if (!exists) {
      global._pushSubscriptions.push(subscription);
    }

    // Send welcome push
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "⚡ TechForDev",
        body: "Push notifications enabled! You'll get breaking tech news.",
        icon: "/icons/icon.svg",
        url: "/",
      })
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
