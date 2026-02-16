// Tab functionality
function initTabs() {
  const tabBtns = document.querySelectorAll('.stuff-tab-btn');
  const tabPanels = document.querySelectorAll('.stuff-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === tabId) {
          panel.classList.add('active');
        }
      });
    });
  });
}

// Nostr notes fetching
async function fetchNotes(hashtag, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p class="stuff-notes-loading">Loading notes...</p>';

  const relays = [
    'wss://relay.damus.io',
    'wss://relay.nostr.band',
    'wss://nos.lol',
    'wss://relay.snort.social'
  ];

  const notes = [];
  const seenIds = new Set();

  // Create filter for kind:1 with hashtag
  const filter = {
    kinds: [1],
    '#t': [hashtag.toLowerCase()],
    limit: 50
  };

  // Connect to relays and fetch
  const fetchFromRelay = (relayUrl) => {
    return new Promise((resolve) => {
      try {
        const ws = new WebSocket(relayUrl);
        const subId = Math.random().toString(36).substring(7);
        let closed = false;

        const timeout = setTimeout(() => {
          if (!closed) {
            closed = true;
            ws.close();
            resolve();
          }
        }, 5000);

        ws.onopen = () => {
          ws.send(JSON.stringify(['REQ', subId, filter]));
        };

        ws.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data);
            if (msg[0] === 'EVENT' && msg[2]) {
              const note = msg[2];
              if (!seenIds.has(note.id)) {
                seenIds.add(note.id);
                notes.push(note);
              }
            } else if (msg[0] === 'EOSE') {
              if (!closed) {
                closed = true;
                clearTimeout(timeout);
                ws.close();
                resolve();
              }
            }
          } catch (e) {}
        };

        ws.onerror = () => {
          if (!closed) {
            closed = true;
            clearTimeout(timeout);
            resolve();
          }
        };

        ws.onclose = () => {
          if (!closed) {
            closed = true;
            clearTimeout(timeout);
            resolve();
          }
        };
      } catch (e) {
        resolve();
      }
    });
  };

  // Fetch from multiple relays
  await Promise.all(relays.map(fetchFromRelay));

  // Sort by created_at (newest first)
  notes.sort((a, b) => b.created_at - a.created_at);

  // Render notes
  if (notes.length === 0) {
    container.innerHTML = '<p class="stuff-notes-empty">No notes found with #' + hashtag + '</p>';
    return;
  }

  // Fetch author profiles
  const authorPubkeys = [...new Set(notes.map(n => n.pubkey))];
  const profiles = await fetchProfiles(authorPubkeys, relays);

  container.innerHTML = notes.slice(0, 20).map(note => {
    const profile = profiles[note.pubkey] || {};
    const authorName = profile.name || profile.display_name || note.pubkey.slice(0, 12) + '...';
    const date = new Date(note.created_at * 1000);
    const timeAgo = formatTimeAgo(date);
    const content = formatNoteContent(note.content);

    return `
      <div class="stuff-note">
        <div class="stuff-note-header">
          <span class="stuff-note-author">${escapeHtml(authorName)}</span>
          <span class="stuff-note-time">${timeAgo}</span>
        </div>
        <div class="stuff-note-content">
          <p>${content}</p>
        </div>
      </div>
    `;
  }).join('');
}

async function fetchProfiles(pubkeys, relays) {
  const profiles = {};

  const filter = {
    kinds: [0],
    authors: pubkeys,
    limit: pubkeys.length
  };

  const fetchFromRelay = (relayUrl) => {
    return new Promise((resolve) => {
      try {
        const ws = new WebSocket(relayUrl);
        const subId = Math.random().toString(36).substring(7);
        let closed = false;

        const timeout = setTimeout(() => {
          if (!closed) {
            closed = true;
            ws.close();
            resolve();
          }
        }, 3000);

        ws.onopen = () => {
          ws.send(JSON.stringify(['REQ', subId, filter]));
        };

        ws.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data);
            if (msg[0] === 'EVENT' && msg[2]) {
              const profile = msg[2];
              try {
                profiles[profile.pubkey] = JSON.parse(profile.content);
              } catch (e) {}
            } else if (msg[0] === 'EOSE') {
              if (!closed) {
                closed = true;
                clearTimeout(timeout);
                ws.close();
                resolve();
              }
            }
          } catch (e) {}
        };

        ws.onerror = () => {
          if (!closed) {
            closed = true;
            clearTimeout(timeout);
            resolve();
          }
        };
      } catch (e) {
        resolve();
      }
    });
  };

  // Just use first relay for profiles
  await fetchFromRelay(relays[0]);

  return profiles;
}

function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return years + 'y ago';
  if (months > 0) return months + 'mo ago';
  if (days > 0) return days + 'd ago';
  if (hours > 0) return hours + 'h ago';
  if (minutes > 0) return minutes + 'm ago';
  return 'just now';
}

function formatNoteContent(content) {
  // Escape HTML
  let formatted = escapeHtml(content);

  // Convert URLs to links
  formatted = formatted.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );

  // Convert newlines to <br>
  formatted = formatted.replace(/\n/g, '<br>');

  return formatted;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initTabs();

  // Check if there's a notes container with a hashtag
  const notesContainer = document.getElementById('notes-content');
  if (notesContainer && notesContainer.dataset.hashtag) {
    fetchNotes(notesContainer.dataset.hashtag, 'notes-content');
  }
});
