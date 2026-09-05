"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.protocol === "https:") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Brahma Service Worker registered:", reg.scope))
        .catch((err) => console.log("Service Worker registration skipped:", err));
    }
  }, []);

  return null;
}