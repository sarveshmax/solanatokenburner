// pages/api/pushover.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = process.env.PUSHOVER_API_TOKEN;
    const user = process.env.PUSHOVER_USER_KEY;

    if (!token || !user) {
      return res.status(500).json({ error: "Missing Pushover credentials" });
    }

    const { title, message } = req.body;

    const pushoverRes = await fetch(
      "https://api.pushover.net/1/messages.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          user,
          title: title ?? "Notification",
          message,
        }),
      },
    );

    const data = await pushoverRes.json();

    return res.status(200).json({ success: true, pushover: data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
