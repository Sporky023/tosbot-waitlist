// TOSbot site — mobile nav + honest waitlist CTAs.
//
// WAITLIST CONFIG (single place):
// Paste your Google Form URL below, OR keep notes/tosbot/marketing/WAITLIST_FORM_URL.txt
// in sync and run the deploy helper (it injects that file into this constant).
// Leave empty / PLACEHOLDER to fall back to mailto capture.
(function () {
  "use strict";

  // === ONE-LINE CONFIG =====================================================
  // Example: "https://docs.google.com/forms/d/e/XXXX/viewform"
  var WAITLIST_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSftFWNiNiCeZAnIQvex22QlY-2KmnH2K28rReukRJr_VG6MhQ/viewform";
  // ========================================================================

  var WAITLIST_MAILTO =
    "mailto:cecilassists@gmail.com?subject=TOSbot%20waitlist&body=Please%20add%20me%20to%20the%20TOSbot%20private%20beta%20waitlist.%0A%0AName%3A%20%0AEmail%3A%20%0APlatforms%20I%20care%20about%20(X%2FInstagram%2FTikTok%2FYouTube)%3A%20";

  function isLiveFormUrl(url) {
    if (!url) return false;
    var u = String(url).trim();
    if (!u || /^PLACEHOLDER$/i.test(u)) return false;
    return /^https?:\/\//i.test(u);
  }

  function waitlistHref() {
    return isLiveFormUrl(WAITLIST_FORM_URL) ? String(WAITLIST_FORM_URL).trim() : WAITLIST_MAILTO;
  }

  function openWaitlist(e) {
    if (e) e.preventDefault();
    var href = waitlistHref();
    // Forms open in new tab; mailto stays in-place.
    if (/^mailto:/i.test(href)) {
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".mobile-menu a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Wire every waitlist CTA (buttons/links with .js-waitlist-cta)
  document.querySelectorAll(".js-waitlist-cta").forEach(function (el) {
    el.setAttribute("href", waitlistHref());
    if (isLiveFormUrl(WAITLIST_FORM_URL)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    } else {
      el.removeAttribute("target");
      el.removeAttribute("rel");
    }
    el.addEventListener("click", openWaitlist);
  });

  // Optional: mark page so CSS/debug can tell form vs mailto mode
  document.documentElement.setAttribute(
    "data-waitlist-mode",
    isLiveFormUrl(WAITLIST_FORM_URL) ? "form" : "mailto"
  );
})();
