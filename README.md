# Phoenix Music Player — Public Distribution & Landing Portal

<div align="center">
  <img src="./public/app-icon.png" width="96" height="96" alt="Phoenix Icon" />
  <h3>The calm, high-fidelity desktop music player built for music you own.</h3>
  <p>Bit-perfect playback, in-app acquisition, studio-grade 10-band EQ, and deep in-place metadata editing.</p>
</div>

---

## 🚀 Distribution & Community

- **Latest Desktop Releases (.dmg, .exe, .deb):** [Releases](https://github.com/JamalLyons/PhoenixMusicPlayer/releases)
- **Discord Community:** [Join Discord](https://discord.gg/TPCBTUrfNT)

---

## 🛠️ Local Development (Landing SPA)

This repository contains the static landing site and release portal built with **Svelte 5**, **Vite**, and **TypeScript**.

### Prerequisites
- Node.js 22+
- `pnpm` 11+

### Quick Start
```bash
# Install dependencies
pnpm install

# Start Vite dev server
pnpm run dev

# Run type check
pnpm run check

# Build static production bundle into dist/
pnpm run build

# Preview build locally
pnpm run preview
```

---

## 📦 Releases Matrix

| Platform | Format | Architecture | Compatibility |
| :--- | :--- | :--- | :--- |
| **macOS** | `.dmg` | Apple Silicon (`aarch64`) | macOS 11 (Big Sur) or higher |
| **macOS** | `.dmg` | Intel (`x86_64`) | macOS 11 (Big Sur) or higher |
| **Windows** | `.exe` / installer | `x64` | Windows 10 (1809+) or Windows 11 |
| **Linux** | `.deb` / `.AppImage` | `x64` | glibc 2.31+ (Ubuntu 20.04+, Fedora, Arch) |

---

## 📄 License
Released under the [MIT License](https://opensource.org/licenses/MIT).
