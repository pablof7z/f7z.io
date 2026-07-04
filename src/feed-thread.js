import NDK, { nip19 } from "@nostr-dev-kit/ndk";

const RELAYS = [
  "wss://relay.damus.io",
  "wss://relay.primal.net",
  "wss://nos.lol",
  "wss://relay.nostr.band",
];

function timeAgo(unixSeconds) {
  const s = Math.max(0, Math.floor(Date.now() / 1000) - unixSeconds);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return m + "m";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h";
  const d = Math.floor(h / 24);
  if (d < 30) return d + "d";
  const mo = Math.floor(d / 30);
  if (mo < 12) return mo + "mo";
  return Math.floor(mo / 12) + "y";
}

function shortNpub(npub) {
  return npub.slice(0, 8) + "…" + npub.slice(-4);
}

function neventFromLink(link) {
  if (!link) return null;
  const id = link.href.split("/").pop();
  try {
    const decoded = nip19.decode(id);
    if (decoded.type === "nevent") return decoded.data;
    if (decoded.type === "note") return { id: decoded.data };
  } catch {
    return null;
  }
  return null;
}

function main() {
  const posts = Array.from(document.querySelectorAll(".post"));
  if (!posts.length) return;

  const ndk = new NDK({
    explicitRelayUrls: RELAYS,
    enableOutboxModel: false,
    autoConnectUserRelays: false,
  });
  ndk.connect().catch(() => {});

  const profileCache = new Map();
  function getProfile(pubkey) {
    if (profileCache.has(pubkey)) return profileCache.get(pubkey);
    const p = ndk
      .getUser({ pubkey })
      .fetchProfile()
      .catch(() => null);
    profileCache.set(pubkey, p);
    return p;
  }

  // ---------- panel chrome (mirrors nownownow/panel.js) ----------

  const backdrop = document.createElement("div");
  backdrop.className = "detail-backdrop";

  const panel = document.createElement("aside");
  panel.className = "detail-panel thread-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-hidden", "true");
  panel.tabIndex = -1;

  const head = document.createElement("div");
  head.className = "detail-head";

  const titleEl = document.createElement("span");
  titleEl.className = "detail-date";
  titleEl.textContent = "Thread";

  const closeBtn = document.createElement("button");
  closeBtn.className = "detail-close";
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "close");
  closeBtn.innerHTML = "&times;";

  head.appendChild(titleEl);
  head.appendChild(closeBtn);

  const body = document.createElement("div");
  body.className = "detail-body feed-list";

  panel.appendChild(head);
  panel.appendChild(body);
  document.body.appendChild(backdrop);
  document.body.appendChild(panel);

  let lastTrigger = null;
  let activeSub = null;

  function close() {
    if (!panel.classList.contains("open")) return;
    if (activeSub) {
      activeSub.stop();
      activeSub = null;
    }
    document.body.classList.remove("panel-open");
    backdrop.classList.remove("open");
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  function buildReplyCard(event) {
    const article = document.createElement("article");
    article.className = "post reply";

    const header = document.createElement("header");
    header.className = "post-head";

    const who = document.createElement("div");
    who.className = "post-who";
    const nameEl = document.createElement("span");
    nameEl.className = "post-name";
    nameEl.textContent = shortNpub(ndk.getUser({ pubkey: event.pubkey }).npub);
    const handleEl = document.createElement("span");
    handleEl.className = "post-handle";
    handleEl.textContent = "";
    who.appendChild(nameEl);
    who.appendChild(handleEl);

    const dateEl = document.createElement("span");
    dateEl.className = "post-date";
    dateEl.textContent = timeAgo(event.created_at);

    header.appendChild(who);
    header.appendChild(dateEl);

    const contentEl = document.createElement("p");
    contentEl.className = "post-content";
    contentEl.textContent = event.content;

    const footer = document.createElement("footer");
    footer.className = "post-foot";
    const link = document.createElement("a");
    try {
      link.href = "https://njump.me/" + nip19.neventEncode({ id: event.id, author: event.pubkey });
    } catch {
      link.href = "https://njump.me/" + event.id;
    }
    link.textContent = "view on nostr →";
    footer.appendChild(link);

    article.appendChild(header);
    article.appendChild(contentEl);
    article.appendChild(footer);

    getProfile(event.pubkey).then((profile) => {
      if (!profile) return;
      if (profile.name || profile.displayName) nameEl.textContent = profile.name || profile.displayName;
      if (profile.nip05) handleEl.textContent = profile.nip05;
      if (profile.picture || profile.image) {
        const img = document.createElement("img");
        img.className = "post-avatar";
        img.width = 36;
        img.height = 36;
        img.loading = "lazy";
        img.referrerPolicy = "no-referrer";
        img.src = profile.picture || profile.image;
        img.onerror = () => img.remove();
        header.insertBefore(img, who);
      }
    });

    return article;
  }

  function open(postEl) {
    const pointer = neventFromLink(postEl.querySelector(".post-foot a"));
    body.innerHTML = "";
    const opClone = postEl.cloneNode(true);
    opClone.classList.remove("is-clickable");
    opClone.removeAttribute("tabindex");
    opClone.removeAttribute("role");
    body.appendChild(opClone);

    const status = document.createElement("p");
    status.className = "thread-status";
    status.textContent = pointer ? "Loading replies…" : "Couldn't identify this note.";
    body.appendChild(status);

    lastTrigger = postEl;
    document.body.classList.add("panel-open");
    backdrop.classList.add("open");
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    panel.scrollTop = 0;
    panel.focus();

    if (activeSub) {
      activeSub.stop();
      activeSub = null;
    }
    if (!pointer) return;

    const seen = new Set();
    let count = 0;

    activeSub = ndk.subscribe(
      { kinds: [1], "#e": [pointer.id] },
      {
        closeOnEose: true,
        relayUrls: RELAYS,
        onEvent(event) {
          if (seen.has(event.id)) return;
          seen.add(event.id);
          count++;
          if (status.parentNode) status.remove();
          body.appendChild(buildReplyCard(event));
        },
        onEose() {
          if (count === 0) {
            status.textContent = "No replies yet.";
          }
        },
      },
    );
  }

  posts.forEach((postEl) => {
    postEl.classList.add("is-clickable");
    postEl.tabIndex = 0;
    postEl.setAttribute("role", "button");
    postEl.addEventListener("click", (e) => {
      if (e.target.closest(".post-foot")) return;
      open(postEl);
    });
    postEl.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !e.target.closest(".post-foot")) {
        e.preventDefault();
        open(postEl);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
