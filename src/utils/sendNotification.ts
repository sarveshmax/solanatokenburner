export async function sendNotification(title: string, message: string) {
  try {
    await fetch("/api/pushover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, message }),
    });
  } catch (err) {
    console.error("Failed to send Pushover notification:", err);
  }
}
