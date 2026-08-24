# Phoenix — Public Landing & Releases

<div align="center">
  <img src="./public/app-icon.png" width="96" height="96" alt="Phoenix Icon" />
  <h3>Music you own, on your desktop.</h3>
  <p>Listen free. Unlock Tools with a one-time license—acquisition, tagging, and EQ in one calm app.</p>
</div>

---

## Distribution & community

- **Landing site:** [jamallyons.github.io/PhoenixMusicPlayer](https://jamallyons.github.io/PhoenixMusicPlayer/)
- **Desktop releases:** [Releases](https://github.com/JamalLyons/PhoenixMusicPlayer/releases)
- **Discord:** [Join](https://discord.gg/TPCBTUrfNT)

## Freemium model

| Tier | Includes |
|------|----------|
| **Free** | Local library, playback, playlists, queue, favorites, themes |
| **Tools** ($29 one-time) | In-app acquisition, staging, metadata editor, bulk/macros, 10-band EQ, dedupe / album builder |

During beta, Tools ship unlocked in the free download while licensing rolls out.

## Local development (landing SPA)

Svelte 5 + Vite + TypeScript static site.

### Prerequisites

- Node.js 22+
- `pnpm` 11+

### Commands

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm run build
pnpm run preview
```

GitHub Pages deploys from `main` via `.github/workflows/pages.yml` (`base: './'`).

## Releases matrix

| Platform | Format | Architecture | Compatibility |
| :--- | :--- | :--- | :--- |
| **macOS** | `.dmg` | Apple Silicon (`aarch64`) | macOS 11+ |
| **macOS** | `.dmg` | Intel (`x86_64`) | macOS 11+ |
| **Windows** | `.exe` | `x64` | Windows 10 (1809+) / 11 |
| **Linux** | `.deb` / `.AppImage` | `x64` | glibc 2.31+ |

## License

Released under the [MIT License](https://opensource.org/licenses/MIT).
