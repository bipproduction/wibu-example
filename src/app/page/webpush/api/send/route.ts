import webpush from "web-push";

const VAPID_PUBLIC_KEY =
  process.env.VAPID_PUBLIC_KEY || "BDKxj4sxYV3mGEkea218RqjtlCtljMaMQWzYQBwmDZcHcqoNRSBGNp-cU8B5rMEzTonJCV5dfIZeorpACojrOUU";
const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY || "emC2UTuNWywd3J5534ZvGyLWFQHAfWlVXba70b39tq4";

webpush.setVapidDetails(
  "mailto:bip.production.js@gmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

let subscriptions: any[] = [];

export async function POST(req: Request) {
  try {
    const notificationPayload = JSON.stringify({
      title: "New Notification",
      message: "You have a new notification!"
    });

    const promises = subscriptions.map((sub) =>
      webpush.sendNotification(sub, notificationPayload)
    );

    Promise.all(promises)
      .then(
        () => new Response("Notification sent successfully", { status: 200 })
      )
      .catch((err) => {
        console.error("Error sending notification: ", err);
        return new Response("Error", { status: 500 });
      });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
