import webpush from "web-push";

const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
const vapidPrivateKey = import.meta.env.VITE_VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:nitinkumar94555206@gmail.com",
  vapidPublicKey,
  vapidPrivateKey
);
