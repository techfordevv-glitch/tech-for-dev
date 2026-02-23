import { NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL || "mailto:admin@techfordev.vercel.app",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

export async function POST(req) {
  try {
    const { title, body, url } = await req.json();
    const subscriptions = global._pushSubscriptions || [];

    if (subscriptions.length === 0) {
      return NextResponse.json({ message: "No subscribers", sent: 0 });
    }

    const payload = JSON.stringify({ title, body, icon: "/icons/icon.svg", url: url || "/" });
    const results = await Promise.allSettled(
      subscriptions.map((sub) => webpush.sendNotification(sub, payload))
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({ success: true, sent, failed });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
