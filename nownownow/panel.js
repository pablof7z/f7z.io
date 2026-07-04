(function () {
  "use strict";

  var entries = Array.prototype.slice.call(document.querySelectorAll(".entry"));
  if (!entries.length) return;

  var backdrop = document.createElement("div");
  backdrop.className = "detail-backdrop";

  var panel = document.createElement("aside");
  panel.className = "detail-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-hidden", "true");
  panel.tabIndex = -1;

  var head = document.createElement("div");
  head.className = "detail-head";

  var dateEl = document.createElement("span");
  dateEl.className = "detail-date";

  var closeBtn = document.createElement("button");
  closeBtn.className = "detail-close";
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "close");
  closeBtn.innerHTML = "&times;";

  head.appendChild(dateEl);
  head.appendChild(closeBtn);

  var titleEl = document.createElement("h2");
  titleEl.className = "detail-title";

  var bodyEl = document.createElement("div");
  bodyEl.className = "detail-body";

  panel.appendChild(head);
  panel.appendChild(titleEl);
  panel.appendChild(bodyEl);

  document.body.appendChild(backdrop);
  document.body.appendChild(panel);

  var lastTrigger = null;

  function open(entry) {
    var date = entry.querySelector(".entry-date");
    var title = entry.querySelector(".entry-title");
    var tpl = entry.querySelector("template");

    dateEl.textContent = date ? date.textContent : "";
    titleEl.textContent = title ? title.textContent : "";
    bodyEl.innerHTML = "";
    if (tpl) bodyEl.appendChild(tpl.content.cloneNode(true));

    lastTrigger = entry;
    document.body.classList.add("panel-open");
    backdrop.classList.add("open");
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    panel.scrollTop = 0;
    panel.focus();
  }

  function close() {
    if (!panel.classList.contains("open")) return;
    document.body.classList.remove("panel-open");
    backdrop.classList.remove("open");
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  entries.forEach(function (entry) {
    // Cards that link out to a full essay (e.g. Trellis → /receipts/) open their
    // own popup modal via essay.js; the sidebar sheet must not also fire for them.
    if (entry.hasAttribute("data-essay")) return;
    entry.addEventListener("click", function () {
      open(entry);
    });
  });

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
