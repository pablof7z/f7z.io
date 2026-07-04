(function () {
  "use strict";

  // Cards marked data-essay open their <template> as a centered popup modal,
  // styled like an essay — NOT the right-side detail sheet the other stuff
  // cards use. We bind in the CAPTURE phase and stop the event immediately, so
  // even a stale/cached panel.js (whose click handler would open the sidebar)
  // never fires for these cards.
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

  var doc = document.createElement("div");
  doc.className = "essay-modal-doc";

  modal.appendChild(closeBtn);
  modal.appendChild(doc);
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  var lastTrigger = null;

  function open(trigger) {
    var tpl = trigger.querySelector("template");
    if (!tpl) return;
    doc.innerHTML = "";
    doc.appendChild(tpl.content.cloneNode(true));
    doc.scrollTop = 0;

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
