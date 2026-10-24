# Phoenix Music Player — Landing & Release Portal
# `just --list` to view available commands

[private]
default:
    @just --list

# Start Vite dev server for the landing site
dev:
    pnpm dev

# Build static production bundle into dist/
build:
    pnpm build

# Preview built production bundle locally
preview:
    pnpm preview

# Run type check across Svelte and TypeScript files
check:
    pnpm check

# Build production macOS .app and .dmg installer
release-apple:
    cd ../app && pnpm tauri build --bundles app,dmg --no-sign -c '{"bundle":{"createUpdaterArtifacts":false}}'

