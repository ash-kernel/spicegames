<div align="center">

<img src="assets/banner.png" alt="SpiceDeck Banner" width="400" />

# SpiceDeck

### A modern, lightweight game launcher for Windows

Organize, track, and launch your entire game library — all in one place.

<br/>

[![Platform](https://img.shields.io/badge/Platform-Windows-blue?logo=windows&logoColor=white)](#)
[![Version](https://img.shields.io/github/v/release/ash-kernel/spicedeck?color=blue)](https://github.com/ash-kernel/spicedeck/releases)
[![Downloads](https://img.shields.io/github/downloads/ash-kernel/spicedeck/total?color=blue)](https://github.com/ash-kernel/spicedeck/releases)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#)

<br/>

[⬇ Download](#-download) • [✨ Features](#-features) • [📸 Screenshots](#-screenshots) • [⚡ Why SpiceDeck](#-why-spicedeck) • [⚖ Legal](#-legal)

</div>

---

## ⬇ Download

| Platform | Installer |
|----------|----------|
| 🪟 Windows | [Download Latest](https://github.com/ash-kernel/spicedeck/releases/download/stable/SpiceDeck.Setup.exe) |

> 📦 You can also find all versions on the Releases page:
> https://github.com/ash-kernel/spicedeck/releases

> 🍎 macOS support planned (when I get access to a Mac 👀)

---

## ✨ Features

### 🎮 Game Library
- Add **any game** from your system (`.exe`)
- Clean, organized library view
- Add & launch games with one click

### 🧠 Smart Metadata
- Auto-fetch game information:
  - Cover art & screenshots
  - Game descriptions
  - Genres & tags
- Data from Steam, SteamSpy & Metacritic
- **HowLongToBeat integration** — See how long games take to complete

### 📊 Game Insights & Statistics
- **Track playtime** automatically with session history
- Visual charts: playtime by day, genre breakdown
- View ratings & reviews:
  - Steam community scores
  - Metacritic ratings
  - OpenCritic scores

### 📚 Game Collections & Status
- Organize with default collections: Favorites, Playing Now, Backlog, Completed, Wishlist
- Track game status: Not Started, Playing, Completed, Dropped, On Hold
- Per-game notes & launch arguments
- Advanced sorting & filtering by name, date, playtime, rating

### 🔎 Discover & Explore
- Dedicated **Discover** tab to browse 50,000+ games
- Filter by genre, trending, new releases, top-rated
- Search by title or tags
- Preview trailers & screenshots before adding

### 📰 Game News & Updates
- Real-time gaming news from top gaming outlets
- PC Gamer, Rock Paper Shotgun, Eurogamer, IGN
- Stay updated on launches, reviews & events

### 🎨 Themes & Customization
- 8 beautiful themes: Indigo, Crimson, Matrix, Ember, Rose, Ocean, Gold, Cyber
- Toggle library tabs (itch.io, Deals, News) on/off
- Customize your perfect game launcher

### 💰 Smart Deals
- Browse game deals across Steam, GOG, Epic Games, Humble Bundle & more
- **Multi-currency support** — View prices in your local currency
- Filter by discount percentage, price range & store rating

### 🎮 Performance Overlay
- AMD Adrenaline-style in-game metrics overlay
- Real-time FPS, CPU, GPU, temperature monitoring
- Configurable per game profile
- Transparent overlay renders over gameplay

### 🎮 GamePad Tester & Support
- Built-in controller detection & testing
- Full gamepad navigation through tabs & library
- Verify your gamepad works before launching games

### ⚡ System Integration
- Run on Windows startup *(optional)*
- Minimize to system tray with toggle control
- **Auto-update checker** — Stay on the latest version
- Import games directly from Steam
- Floating widget overlay for active game tracking
- Screenshot scanner — organize game screenshots
- Fully offline & local
- No accounts or login required

---

## ⚡ Why SpiceDeck?

Most launchers are either:
- ❌ bloated  
- ❌ tied to a platform  
- ❌ require accounts  

**SpiceDeck is different:**
- ✅ Works with *any game*  
- ✅ Fully offline & private  
- ✅ Lightweight and fast  
- ✅ No tracking, no nonsense  

---

## 📸 Screenshots

<div align="center">

<img src="assets/demo1.png" alt="Library View" width="600"/>
<br/><br/>
<img src="assets/demo2.png" alt="Game Details" width="600"/>

</div>

---

## 🔒 Privacy

SpiceDeck respects your privacy.

- No accounts  
- No analytics  
- No tracking  
- No cloud storage  

All data is stored **locally on your device**.

Game metadata is fetched directly from public APIs on your machine.

---

## 🛠 Tech Overview

- Desktop app (Windows) built with Electron & React
- Local data storage
- External APIs:
  - Steam Store, SteamSpy & Steam CDN (game metadata)
  - CheapShark (deals)
  - itch.io (indie games)
  - OpenCritic & Metacritic (reviews)
  - HowLongToBeat (completion times)
  - PC Gamer, Rock Paper Shotgun, Eurogamer & IGN (news feeds)

---

## 🚀 Roadmap

- [ ] macOS support  
- [ ] Cloud sync  
- [ ] Advanced stats dashboard  
- [ ] Plugin system  

---

## ⚠️ Windows SmartScreen Warning

**Having trouble running the installer?**

On first launch, Windows may show a "SmartScreen Protection" or "Smart App Control" warning. This is normal for unsigned applications.

### How to Bypass SmartScreen

1. **When the warning appears:**
   - Click **"More info"** button
   - Click **"Run anyway"** at the bottom
   - The app will launch normally

2. **Or disable Smart App Control in Windows Defender:**
   - Open **Windows Security** (search in Start menu)
   - Go to **App & browser control**
   - Scroll down to **Smart App Control**
   - Change setting to **"Off"**
   - Restart your computer

### About Code Signing

The app isn't code-signed because code-signing certificates cost $50-$300+ per year. Since this is a personal project, I can't afford to pay for a certificate right now. Once you bypass the warning once, it won't bother you again!

---

## 🔄 Recent Updates (v5.0.0)

### ✨ New Features
- 🎮 **Performance Overlay** — AMD Adrenaline-style in-game metrics (FPS, CPU, GPU, temperature)
- 📰 **Game News Tab** — Real-time gaming news from PC Gamer, Rock Paper Shotgun, Eurogamer & IGN
- 🎮 **GamePad Navigation** — Full controller support for tabs & library browsing
- 💱 **Multi-Currency Support** — View deals in USD, EUR, GBP, JPY, and more
- 🎨 **8 Themes** — Indigo, Crimson, Matrix, Ember, Rose, Ocean, Gold, Cyber  
- 📊 **Stats Dashboard** — Playtime charts, genre breakdowns, session history
- 🔀 **Customizable Tabs** — Toggle itch.io, Deals, News on/off
- 🕐 **HLTB Integration** — Completion times in game details
- 📚 **Collections System** — Favorites, Playing Now, Backlog, Completed, Wishlist
- 🎮 **Widget Mode** — Floating overlay showing current game & playtime
- 📁 **Steam Integration** — Import games directly from your Steam library
- 📸 **Screenshot Scanner** — Find and organize screenshots from any folder

### 🐛 Improvements
- ✅ Auto-update checker with one-click release access
- ✅ System tray integration with minimize support
- ✅ Enhanced game status tracking & collections
- ✅ Streamlined UI/UX across all sections
- ✅ Persistent game session history & statistics

---

## ⚖ Legal

- Privacy Policy: https://ash-kernel.github.io/spicedeck/#legal  
- Terms of Service: https://ash-kernel.github.io/spicedeck/#legal  

© SpiceDeck. All rights reserved.  
Redistribution or resale is not permitted.

---

<div align="center">

Made with 💻 by  
https://github.com/ash-kernel

</div>