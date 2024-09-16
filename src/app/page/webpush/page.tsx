"use client";
import { Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";

const publicVapidKey =
  "BDKxj4sxYV3mGEkea218RqjtlCtljMaMQWzYQBwmDZcHcqoNRSBGNp-cU8B5rMEzTonJCV5dfIZeorpACojrOUU";
export default function Page() {
  useShallowEffect(() => {
    // if ("serviceWorker" in navigator) {
    //   send().catch((err) => console.error("Push registration error:", err));
    // }

    if ("serviceWorker" in navigator) {
     
      send();
    }

    if ("PushManager" in window) {
      console.log("Push is supported");
    } else {
      console.error("Push is not supported in this browser");
    }
  }, []);

  const send = async () => {
    try {
      const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"
      });

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

      console.log(subscription);

      //   const kirim = await fetch("/page/webpush/api/subscribe", {
      //     method: "POST",
      //     body: JSON.stringify(subscription),
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   });

      //   console.log(await kirim.text());
    } catch (error) {
      console.error(error);
    }
  };

  const triggerNotification = async () => {
    await fetch("/page/webpush/api/send", { method: "POST" });
  };

  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  return (
    <Stack>
      <div>
        <h1>Push Notification Example</h1>
        <button onClick={triggerNotification}>Send Notification</button>
      </div>
    </Stack>
  );
}
