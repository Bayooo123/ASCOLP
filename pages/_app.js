import { useEffect } from "react";
import { VENDOR_JS } from "../lib/vendorAssets";

// The Oslim template's vendor scripts depend on load order (jQuery must be
// present before its plugins register, oslim.js must run last). next/script's
// afterInteractive strategy doesn't guarantee that order under real network
// timing, so scripts are chained manually: each one is appended only after
// the previous one's onload fires. Running from useEffect (post-hydration)
// also avoids the vendor scripts mutating DOM nodes while React is still
// hydrating them.
function loadScriptsSequentially(srcs, onDone) {
  let i = 0;
  function next() {
    if (i >= srcs.length) {
      onDone();
      return;
    }
    const src = srcs[i++];
    const script = document.createElement("script");
    script.src = src;
    script.onload = next;
    script.onerror = next;
    document.body.appendChild(script);
  }
  next();
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    loadScriptsSequentially(VENDOR_JS, () => {
      // oslim.js wires the preloader fade-out, Swiper init, WOW.js, etc. to
      // window's native "load" event, which has already fired by the time
      // these scripts finish injecting — re-fire it manually so those run.
      if (window.jQuery) window.jQuery(window).trigger("load");
    });
  }, []);

  return <Component {...pageProps} />;
}
