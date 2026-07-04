import NDK, { NDKHighlight, NDKNip07Signer, NDKRelaySet } from "@nostr-dev-kit/ndk";

const RELAYS = [
  "wss://relay.damus.io",
  "wss://relay.primal.net",
  "wss://nos.lol",
  "wss://relay.nostr.band",
];

const NIP07_POLL_MS = 200;
const NIP07_POLL_TIMEOUT_MS = 3000;
const SIGNED_IN_KEY = "f7z:nostr-signed-in";

// pablof7z — same pubkey the site's NIP-05 identity resolves to (api/nip05.js).
// Essays are published as NIP-23 long-form articles (kind 30023) under this
// pubkey, one per slug, so highlights anchor to that "a" tag rather than to
// whatever URL happens to be serving the page (which breaks under localhost,
// preview deploys, etc).
const AUTHOR_PUBKEY = "fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52";

function essaySlug() {
  return location.pathname.replace(/^\/|\/$/g, "");
}

function articleATag(slug) {
  return `30023:${AUTHOR_PUBKEY}:${slug}`;
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function shortNpub(npub) {
  return npub.slice(0, 8) + "…" + npub.slice(-4);
}

function timeAgo(unixSeconds) {
  const s = Math.max(0, Math.floor(Date.now() / 1000) - unixSeconds);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h ago";
  const d = Math.floor(h / 24);
  if (d < 30) return d + "d ago";
  const mo = Math.floor(d / 30);
  if (mo < 12) return mo + "mo ago";
  return Math.floor(mo / 12) + "y ago";
}

// ---------- text search & DOM wrapping ----------

function buildTextMaps(container) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node.parentElement && node.parentElement.closest(".n-hl-toolbar, .n-auth")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodeMap = []; // { node, start, end } in raw-string coordinates
  const rawParts = [];
  let rawLen = 0;
  let node;
  while ((node = walker.nextNode())) {
    const len = node.nodeValue.length;
    nodeMap.push({ node, start: rawLen, end: rawLen + len });
    rawParts.push(node.nodeValue);
    rawLen += len;
  }
  const raw = rawParts.join("");

  // normalized string + normIndex -> rawIndex map
  const normChars = [];
  const normToRaw = [];
  let inWhitespace = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (/\s/.test(ch)) {
      if (!inWhitespace) {
        normChars.push(" ");
        normToRaw.push(i);
        inWhitespace = true;
      }
    } else {
      normChars.push(ch);
      normToRaw.push(i);
      inWhitespace = false;
    }
  }

  return { nodeMap, raw, normalized: normChars.join(""), normToRaw };
}

function rawIndexToNodeOffset(nodeMap, rawIndex) {
  for (const entry of nodeMap) {
    if (rawIndex >= entry.start && rawIndex <= entry.end) {
      return { node: entry.node, offset: rawIndex - entry.start };
    }
  }
  return null;
}

function wrapRange(range, className) {
  const mark = document.createElement("mark");
  mark.className = className;
  try {
    mark.appendChild(range.extractContents());
    range.insertNode(mark);
    return mark;
  } catch {
    return null;
  }
}

function findAndWrap(container, searchText, className) {
  const needle = normalize(searchText);
  if (!needle) return null;
  const { nodeMap, normalized, normToRaw } = buildTextMaps(container);
  const idx = normalized.indexOf(needle);
  if (idx === -1) return null;

  const rawStart = normToRaw[idx];
  const rawEndCharIndex = normToRaw[idx + needle.length - 1];
  // extend one raw char past the last matched character
  const rawEnd = rawEndCharIndex + 1;

  const startPos = rawIndexToNodeOffset(nodeMap, rawStart);
  const endPos = rawIndexToNodeOffset(nodeMap, rawEnd);
  if (!startPos || !endPos) return null;

  const range = document.createRange();
  range.setStart(startPos.node, startPos.offset);
  range.setEnd(endPos.node, endPos.offset);
  return wrapRange(range, className);
}

// ---------- tooltip ----------

let tooltipEl = null;

function ensureTooltip() {
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement("div");
  tooltipEl.className = "n-hl-tooltip";
  tooltipEl.setAttribute("role", "status");
  document.body.appendChild(tooltipEl);
  return tooltipEl;
}

function hideTooltip() {
  if (tooltipEl) tooltipEl.classList.remove("is-visible");
}

async function showTooltip(state, mark) {
  const tip = ensureTooltip();
  const entry = state.byText.get(mark.dataset.key);
  if (!entry) return;

  const pubkeys = [...entry.authors];
  const first = pubkeys[0];
  const profile = await getProfile(state, first);
  const name = profile?.name || profile?.displayName || shortNpub(state.ndk.getUser({ pubkey: first }).npub);
  const others = pubkeys.length - 1;

  tip.innerHTML = "";
  const row = document.createElement("div");
  row.className = "n-hl-tip-row";

  if (profile?.picture || profile?.image) {
    const img = document.createElement("img");
    img.src = profile.picture || profile.image;
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    img.className = "n-hl-tip-avatar";
    img.onerror = () => img.remove();
    row.appendChild(img);
  }

  const label = document.createElement("span");
  label.textContent = others > 0 ? `${name} + ${others} other${others > 1 ? "s" : ""}` : name;
  row.appendChild(label);

  tip.appendChild(row);
  const when = document.createElement("div");
  when.className = "n-hl-tip-time";
  when.textContent = timeAgo(entry.created_at);
  tip.appendChild(when);

  const rect = mark.getBoundingClientRect();
  tip.style.left = rect.left + rect.width / 2 + window.scrollX + "px";
  tip.style.top = rect.top + window.scrollY - 10 + "px";
  tip.classList.add("is-visible");
}

// ---------- profile cache ----------

function getProfile(state, pubkey) {
  if (state.profileCache.has(pubkey)) return state.profileCache.get(pubkey);
  const promise = state.ndk
    .getUser({ pubkey })
    .fetchProfile()
    .catch(() => null);
  state.profileCache.set(pubkey, promise);
  return promise;
}

// ---------- rendering incoming highlights ----------

function renderHighlight(state, container, event) {
  if (state.seen.has(event.id)) return;
  state.seen.add(event.id);

  const text = event.content;
  const key = normalize(text);
  if (!key) return;

  let entry = state.byText.get(key);
  if (entry) {
    entry.authors.add(event.pubkey);
    entry.created_at = Math.min(entry.created_at, event.created_at || entry.created_at);
    return;
  }

  const mark = findAndWrap(container, text, "n-highlight");
  if (!mark) return;
  mark.dataset.key = key;
  mark.tabIndex = 0;

  entry = { mark, authors: new Set([event.pubkey]), created_at: event.created_at || Math.floor(Date.now() / 1000) };
  state.byText.set(key, entry);

  mark.addEventListener("mouseenter", () => showTooltip(state, mark));
  mark.addEventListener("focus", () => showTooltip(state, mark));
  mark.addEventListener("mouseleave", hideTooltip);
  mark.addEventListener("blur", hideTooltip);
}

function loadHighlights(state, container, aTag) {
  state.ndk.subscribe(
    { kinds: [9802], "#a": [aTag] },
    {
      closeOnEose: false,
      relayUrls: RELAYS,
      onEvent: (event) => renderHighlight(state, container, event),
    },
  );
}

// ---------- selection-to-highlight toolbar ----------

function nearestParagraph(node) {
  const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  return el ? el.closest("p, li, blockquote") : null;
}

function setupSelectionToolbar(state, container, aTag) {
  let toolbar = null;

  function removeToolbar() {
    if (toolbar) {
      toolbar.remove();
      toolbar = null;
    }
  }

  document.addEventListener("mouseup", (e) => {
    if (e.target.closest && e.target.closest(".n-hl-toolbar")) return;

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      removeToolbar();
      return;
    }
    const range = sel.getRangeAt(0);
    if (!container.contains(range.commonAncestorContainer)) {
      removeToolbar();
      return;
    }
    const text = normalize(sel.toString());
    if (!text) {
      removeToolbar();
      return;
    }

    removeToolbar();
    toolbar = document.createElement("button");
    toolbar.className = "n-hl-toolbar";
    toolbar.type = "button";
    toolbar.textContent = "Highlight";

    const rect = range.getBoundingClientRect();
    toolbar.style.left = rect.left + rect.width / 2 + window.scrollX + "px";
    toolbar.style.top = rect.top + window.scrollY - 44 + "px";

    // keep the selection alive through the click
    toolbar.addEventListener("mousedown", (e) => e.preventDefault());
    toolbar.addEventListener("click", async () => {
      toolbar.disabled = true;
      toolbar.textContent = "Highlighting…";
      try {
        const highlight = new NDKHighlight(state.ndk);
        highlight.content = sel.toString().trim();
        highlight.tags.push(["a", aTag]);
        const paragraph = nearestParagraph(range.startContainer);
        if (paragraph) highlight.context = normalize(paragraph.textContent);

        await highlight.sign();
        state.seen.add(highlight.id);

        const mark = wrapRange(range.cloneRange(), "n-highlight");
        if (mark) {
          const key = text;
          mark.dataset.key = key;
          mark.tabIndex = 0;
          state.byText.set(key, {
            mark,
            authors: new Set([state.user.pubkey]),
            created_at: Math.floor(Date.now() / 1000),
          });
          mark.addEventListener("mouseenter", () => showTooltip(state, mark));
          mark.addEventListener("focus", () => showTooltip(state, mark));
          mark.addEventListener("mouseleave", hideTooltip);
          mark.addEventListener("blur", hideTooltip);
        }

        await highlight.publish(state.relaySet);
      } catch (err) {
        console.error("[f7z] highlight publish failed", err);
      } finally {
        sel.removeAllRanges();
        removeToolbar();
      }
    });

    document.body.appendChild(toolbar);
  });

  document.addEventListener("mousedown", (e) => {
    if (toolbar && e.target !== toolbar) removeToolbar();
  });
}

// ---------- NIP-07 sign-in ----------

function waitForNip07(timeoutMs) {
  return new Promise((resolve) => {
    if (window.nostr) return resolve(true);
    const start = Date.now();
    const iv = setInterval(() => {
      if (window.nostr) {
        clearInterval(iv);
        resolve(true);
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(iv);
        resolve(false);
      }
    }, NIP07_POLL_MS);
  });
}

async function signIn(state, button, { silent = false } = {}) {
  try {
    const signer = new NDKNip07Signer(4000, state.ndk);
    const user = await signer.blockUntilReady();
    state.ndk.signer = signer;
    state.signer = signer;
    state.user = user;
    localStorage.setItem(SIGNED_IN_KEY, "1");
    renderSignedIn(state, button, user);
    setupSelectionToolbar(state, state.container, state.aTag);
  } catch (err) {
    if (!silent) console.error("[f7z] nostr sign-in failed", err);
    localStorage.removeItem(SIGNED_IN_KEY);
  }
}

async function renderSignedIn(state, button, user) {
  button.classList.add("is-signed-in");
  button.title = "Signed in — click to sign out";
  const profile = await getProfile(state, user.pubkey);
  const name = profile?.name || profile?.displayName || shortNpub(user.npub);
  button.innerHTML = "";
  if (profile?.picture || profile?.image) {
    const img = document.createElement("img");
    img.src = profile.picture || profile.image;
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    img.className = "n-auth-avatar";
    img.onerror = () => img.remove();
    button.appendChild(img);
  }
  const label = document.createElement("span");
  label.textContent = name;
  button.appendChild(label);
}

function renderSignedOut(button) {
  button.classList.remove("is-signed-in");
  button.title = "";
  button.textContent = "Sign in with Nostr";
}

async function setupAuth(state) {
  const detected = await waitForNip07(NIP07_POLL_TIMEOUT_MS);
  if (!detected) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "n-auth";
  renderSignedOut(button);
  document.body.appendChild(button);

  button.addEventListener("click", async () => {
    if (state.signer) {
      state.ndk.signer = undefined;
      state.signer = null;
      state.user = null;
      localStorage.removeItem(SIGNED_IN_KEY);
      renderSignedOut(button);
      return;
    }
    button.textContent = "Signing in…";
    await signIn(state, button);
    if (!state.signer) renderSignedOut(button);
  });

  if (localStorage.getItem(SIGNED_IN_KEY) === "1") {
    button.textContent = "Signing in…";
    await signIn(state, button, { silent: true });
    if (!state.signer) renderSignedOut(button);
  }
}

// ---------- entry ----------

function main() {
  const container = document.querySelector("main.page.essay");
  if (!container) return;

  const aTag = articleATag(essaySlug());
  const ndk = new NDK({
    explicitRelayUrls: RELAYS,
    enableOutboxModel: false,
    autoConnectUserRelays: false,
  });
  ndk.connect().catch(() => {});

  const state = {
    ndk,
    container,
    aTag,
    relaySet: NDKRelaySet.fromRelayUrls(RELAYS, ndk),
    signer: null,
    user: null,
    seen: new Set(),
    byText: new Map(),
    profileCache: new Map(),
  };

  loadHighlights(state, container, aTag);
  setupAuth(state);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
