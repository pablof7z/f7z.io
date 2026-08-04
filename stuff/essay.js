(function () {
  "use strict";

  // Cards marked data-essay open the ACTUAL essay page (e.g. /receipts/) inside
  // a near-fullscreen modal via an <iframe>. This is deliberately the same
  // renderer as navigating there directly — identical HTML, style.css and
  // highlights.js — so the modal is a true prime reading experience, not a
  // second, differently-styled copy of the prose.
  //
  // We bind in the CAPTURE phase and stop the event immediately, so even a
  // stale/cached panel.js (whose click handler would open the side sheet) never
  // fires for these cards.
  var triggers = Array.prototype.slice.call(
    document.querySelectorAll("[data-essay]")
  );
  if (!triggers.length) return;

  var backdrop = document.createElement("div");
  backdrop.className = "essay-backdrop";

  var modal = document.createElement("div");
  modal.className = "essay-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "true");
  modal.tabIndex = -1;

  var closeBtn = document.createElement("button");
  closeBtn.className = "essay-close";
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "close");
  closeBtn.innerHTML = "&times;";

  var frame = document.createElement("iframe");
  frame.className = "essay-frame";
  frame.setAttribute("title", "essay");
  frame.setAttribute("loading", "lazy");

  modal.appendChild(closeBtn);
  modal.appendChild(frame);
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  // The iframe loads the real essay page, which carries the site masthead + footer.
  // Inside the modal those are redundant chrome, so — same origin — we hide them by
  // injecting a style into the loaded document. The frame stays hidden (via the
  // .loading class) until this runs, so the header never flashes in first.
  frame.addEventListener("load", function () {
    try {
      var doc = frame.contentDocument;
      if (doc) {
        var style = doc.getElementById("essay-embed-style");
        if (!style) {
          style = doc.createElement("style");
          style.id = "essay-embed-style";
          style.textContent =
            ".masthead,footer{display:none!important}";
          (doc.head || doc.documentElement).appendChild(style);
        }
      }
    } catch (err) {
      /* cross-origin or detached — leave the page as-is */
    }
    frame.classList.remove("loading");
  });

  var lastTrigger = null;

  function open(trigger) {
    var url = trigger.getAttribute("data-essay");
    if (!url) return;
    var title = trigger.getAttribute("data-essay-title");
    if (title) {
      modal.setAttribute("aria-label", title);
      frame.setAttribute("title", title);
    }
    // Assigning src each open reloads the page fresh, so it always renders from
    // the top exactly as a direct visit would. Keep it hidden until the load
    // handler has injected the chrome-hiding style.
    frame.classList.add("loading");
    frame.src = url;

    lastTrigger = trigger;
    document.body.classList.add("essay-open");
    backdrop.classList.add("open");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    closeBtn.focus();
  }

  function close() {
    if (!modal.classList.contains("open")) return;
    document.body.classList.remove("essay-open");
    backdrop.classList.remove("open");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    // Drop the src so the iframe stops running and the next open reloads clean.
    frame.removeAttribute("src");
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        open(trigger);
      },
      true // capture phase — beats the bubble-phase sidebar handler
    );
  });

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
