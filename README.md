# FocusTube 🧠

FocusTube is a Chrome extension that transforms YouTube into a **distraction-free, intent-driven platform** by removing algorithmic recommendations and allowing users to focus only on the content they intentionally choose.

Unlike ad blockers or aggressive UI removers, FocusTube is designed around **attention control** — not restriction.

---

## ✨ Features

### 🏠 Clean Home Page
- YouTube home feed is completely blank
- No recommendations, no Shorts rail, no trending
- Eliminates passive scrolling

### ▶️ Focused Video Watching
- Sidebar recommendations are hidden
- End-screen suggestions are removed
- Only the video and essential controls remain

### 💬 Comments (User Controlled)
- Comments are **OFF by default**
- A toggle allows users to turn comments ON only when needed
- Automatically resets for the next video

### 🔒 Focus Mode by Default
- Focus Mode is ON as soon as YouTube opens
- Remains active until manually disabled
- Designed to protect attention from the first second

---

## 🧠 Design Philosophy

FocusTube follows a simple rule:

> **Show only what the user explicitly asked for.  
Hide everything else.**

- Home page → neutral entry
- Search → intentional discovery
- Watch page → single-task focus
- Comments → conscious choice

This avoids dopamine loops without breaking YouTube’s core functionality.

---

## 🛠 How It Works

FocusTube uses:
- Route-based detection (`/`, `/watch`, `/results`, `/shorts`)
- CSS visibility control instead of DOM removal
- SPA-safe observation for YouTube navigation
- Trusted Types & CSP-safe DOM APIs

All changes are **fully reversible** and do not interfere with playback.

---

## 📦 Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

Open YouTube and experience distraction-free viewing 🧘‍♂️

---

## ⚠️ Notes & Limitations

- Background tabs may be throttled by Chrome (by design)
- This extension does not block ads
- Designed for productivity, not content manipulation

---

## 📈 F
