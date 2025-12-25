/*************************************************
 * FOCUSTUBE – DISTRACTION FREE YOUTUBE
 * Default: Focus Mode ON
 *************************************************/

(function () {
  'use strict';

  /* =========================
     GLOBAL STATE
  ========================== */
  const html = document.documentElement;
  html.classList.add('focus-mode');

  /* =========================
     ROUTE HELPERS
  ========================== */
  function isFeed() {
    return (
      location.pathname === '/' ||
      location.pathname.startsWith('/feed') ||
      location.pathname === '/shorts'
    );
  }

  function isWatch() {
    return location.pathname === '/watch';
  }

  /* =========================
     APPLY FOCUS RULES
  ========================== */
  function applyFocusRules() {
    html.classList.remove('comments-on');
    if (isFeed()) html.classList.add('focus-home');
    else html.classList.remove('focus-home');
  }

  applyFocusRules();

  let lastPath = location.pathname;
  setInterval(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      applyFocusRules();
    }
  }, 400);
})();

/* =========================
   SHORTS → REDIRECT TO WATCH
========================= */

(function () {
  let lastPath = location.pathname;

  setInterval(() => {
    const path = location.pathname;
    if (path.startsWith('/shorts/') && path !== lastPath) {
      const id = path.split('/shorts/')[1];
      if (id) location.replace(`/watch?v=${id}`);
    }
    lastPath = path;
  }, 300);
})();

/* =========================
   FOCUS MODE CSS
========================= */

(function injectFocusCSS() {
  const style = document.createElement('style');
  style.textContent = `
    /* HOME / FEEDS → BLANK */
    html.focus-mode.focus-home ytd-rich-grid-renderer,
    html.focus-mode.focus-home ytd-reel-shelf-renderer,
    html.focus-mode.focus-home ytd-reel-video-renderer,
    html.focus-mode.focus-home ytd-shorts {
      display: none !important;
    }

    /* WATCH PAGE → HIDE SIDEBAR */
    html.focus-mode ytd-watch-next-secondary-results-renderer {
      display: none !important;
    }

    /* COMMENTS → OFF BY DEFAULT */
    html.focus-mode ytd-comments {
      display: none !important;
    }

    /* COMMENTS → USER ENABLED */
    html.focus-mode.comments-on ytd-comments {
      display: block !important;
    }
  `;
  document.documentElement.appendChild(style);
})();

/* =========================
   COMMENTS TOGGLE BUTTON
========================= */

(function () {
  function injectButton() {
    if (location.pathname !== '/watch') return;
    if (document.querySelector('.focus-comments-btn')) return;

    const container = document.querySelector('ytd-watch-metadata #top-row');
    if (!container) return;

    const btn = document.createElement('button');
    btn.className = 'focus-comments-btn';
    btn.textContent = '💬 Comments';
    btn.style.cssText = `
      margin-left:12px;
      padding:6px 14px;
      border-radius:18px;
      border:none;
      cursor:pointer;
      background:#f1f1f1;
      color:#0f0f0f;
      font-size:13px;
    `;

    btn.onclick = () => {
      const enabled = document.documentElement.classList.toggle('comments-on');
      btn.textContent = enabled ? '💬 Hide Comments' : '💬 Comments';
    };

    container.appendChild(btn);
  }

  new MutationObserver(injectButton).observe(document.body, {
    childList: true,
    subtree: true
  });
})();

/* =========================
   AUTOPLAY CONTROL (CORRECT)
   - DO NOT TOUCH DURING PLAYBACK
   - DISABLE ONLY AFTER VIDEO ENDS
========================= */

(function () {
  function attachAutoplayEndHandler() {
    if (!document.documentElement.classList.contains('focus-mode')) return;
    if (location.pathname !== '/watch') return;

    const video = document.querySelector('video');
    if (!video || video.__focusAutoplayHandled) return;

    video.__focusAutoplayHandled = true;

    video.addEventListener(
      'ended',
      () => {
        const toggle = document.querySelector('.ytp-autonav-toggle-button');
        if (toggle && toggle.getAttribute('aria-checked') === 'true') {
          toggle.click();
        }
      },
      { once: true }
    );
  }

  setInterval(attachAutoplayEndHandler, 800);
})();

/*************************************************
 * BLOCK POST-END VIDEO SUGGESTIONS
 * (SAFE OVERLAY + CLEANUP)
 *************************************************/

(function () {
  function setupEndOverlay() {
    if (location.pathname !== '/watch') return;

    const video = document.querySelector('video');
    const player = document.querySelector('.html5-video-player');
    if (!video || !player || video.__focusOverlayReady) return;

    video.__focusOverlayReady = true;
    let overlay = null;

    function createOverlay() {
      if (overlay) return;
      overlay = document.createElement('div');
      overlay.id = 'focus-end-overlay';
      overlay.style.cssText = `
        position:absolute;
        top:10%;
        left:10%;
        width:80%;
        height:60%;
        z-index:9999;
        background:transparent;
        pointer-events:all;
      `;
      player.style.position = 'relative';
      player.appendChild(overlay);
    }

    function removeOverlay() {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
        overlay = null;
      }
    }

    // Add overlay ONLY when video ends
    video.addEventListener('ended', createOverlay);

    // Remove overlay when user replays / seeks / plays again
    video.addEventListener('play', removeOverlay);
    video.addEventListener('seeking', removeOverlay);
  }

  setInterval(setupEndOverlay, 800);
})();
