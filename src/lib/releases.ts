import type { PlatformKey, ReleaseInfo, PlatformOption } from './types';

const REPO_OWNER = 'JamalLyons';
const REPO_NAME = 'PhoenixMusicPlayer';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
const RELEASES_PAGE = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`;

export function detectUserPlatform(): PlatformKey {
  if (typeof window === 'undefined') return 'macos-arm';

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = (window.navigator as any)?.userAgentData?.platform?.toLowerCase() || window.navigator.platform.toLowerCase();

  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }

  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux';
  }

  if (platform.includes('mac') || userAgent.includes('macintosh')) {
    // Check for Apple Silicon vs Intel
    // WebGL renderer detection heuristic or navigator.userAgentData
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (renderer && renderer.includes('Apple')) {
            return 'macos-arm';
          }
        }
      }
    } catch {
      // fallback
    }
    return 'macos-arm'; // Default to Apple Silicon for modern macOS
  }

  return 'macos-arm';
}

export function formatFileSize(bytes?: number): string {
  if (!bytes || isNaN(bytes)) return '';
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function fetchLatestRelease(): Promise<ReleaseInfo> {
  const defaultVersion = 'v0.1.0';
  const defaultRelease: ReleaseInfo = {
    version: defaultVersion,
    publishedAt: new Date().toISOString(),
    htmlUrl: RELEASES_PAGE,
    assets: {
      macosArm: {
        name: `Phoenix_${defaultVersion.replace('v', '')}_aarch64.dmg`,
        browser_download_url: `${RELEASES_PAGE}/download/${defaultVersion}/Phoenix_${defaultVersion.replace('v', '')}_aarch64.dmg`,
        size: 14500000,
      },
      macosIntel: {
        name: `Phoenix_${defaultVersion.replace('v', '')}_x64.dmg`,
        browser_download_url: `${RELEASES_PAGE}/download/${defaultVersion}/Phoenix_${defaultVersion.replace('v', '')}_x64.dmg`,
        size: 15200000,
      },
      windows: {
        name: `Phoenix_${defaultVersion.replace('v', '')}_x64-setup.exe`,
        browser_download_url: `${RELEASES_PAGE}/download/${defaultVersion}/Phoenix_${defaultVersion.replace('v', '')}_x64-setup.exe`,
        size: 12800000,
      },
      linuxDeb: {
        name: `phoenix_${defaultVersion.replace('v', '')}_amd64.deb`,
        browser_download_url: `${RELEASES_PAGE}/download/${defaultVersion}/phoenix_${defaultVersion.replace('v', '')}_amd64.deb`,
        size: 16100000,
      },
    },
  };

  try {
    const res = await fetch(API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      return defaultRelease;
    }

    const data = await res.json();
    const assets = data.assets || [];

    const findAsset = (pattern: RegExp) => {
      const match = assets.find((a: any) => pattern.test(a.name));
      if (!match) return undefined;
      return {
        name: match.name,
        browser_download_url: match.browser_download_url,
        size: match.size,
        download_count: match.download_count,
      };
    };

    const macosArm = findAsset(/(aarch64|arm64).*\.dmg$/i) || findAsset(/aarch64.*\.dmg$/i);
    const macosIntel = findAsset(/(x64|x86_64).*\.dmg$/i) || findAsset(/\.dmg$/i);
    const windows = findAsset(/\.exe$/i) || findAsset(/\.msi$/i);
    const linuxDeb = findAsset(/\.deb$/i);
    const linuxAppImage = findAsset(/\.AppImage$/i);

    return {
      version: data.tag_name || defaultVersion,
      publishedAt: data.published_at || new Date().toISOString(),
      htmlUrl: data.html_url || RELEASES_PAGE,
      assets: {
        macosArm: macosArm || defaultRelease.assets.macosArm,
        macosIntel: macosIntel || defaultRelease.assets.macosIntel,
        windows: windows || defaultRelease.assets.windows,
        linuxDeb: linuxDeb || defaultRelease.assets.linuxDeb,
        linuxAppImage: linuxAppImage || defaultRelease.assets.linuxAppImage,
      },
    };
  } catch (err) {
    console.warn('Could not fetch latest release info from GitHub, using defaults:', err);
    return defaultRelease;
  }
}

export function getPlatformOptions(release?: ReleaseInfo): PlatformOption[] {
  const assets = release?.assets;

  return [
    {
      key: 'macos-arm',
      label: 'macOS',
      sublabel: 'Apple Silicon (M1/M2/M3/M4)',
      arch: 'ARM64',
      fileExt: '.dmg',
      icon: 'apple',
      downloadUrl: assets?.macosArm?.browser_download_url,
      filename: assets?.macosArm?.name,
      sizeFormatted: formatFileSize(assets?.macosArm?.size),
    },
    {
      key: 'macos-intel',
      label: 'macOS',
      sublabel: 'Intel Processors',
      arch: 'x64',
      fileExt: '.dmg',
      icon: 'apple',
      downloadUrl: assets?.macosIntel?.browser_download_url,
      filename: assets?.macosIntel?.name,
      sizeFormatted: formatFileSize(assets?.macosIntel?.size),
    },
    {
      key: 'windows',
      label: 'Windows',
      sublabel: 'Windows 10 / 11 (64-bit)',
      arch: 'x64',
      fileExt: '.exe',
      icon: 'monitor',
      downloadUrl: assets?.windows?.browser_download_url,
      filename: assets?.windows?.name,
      sizeFormatted: formatFileSize(assets?.windows?.size),
    },
    {
      key: 'linux',
      label: 'Linux',
      sublabel: 'Debian / Ubuntu / AppImage',
      arch: 'x64',
      fileExt: '.deb',
      icon: 'terminal',
      downloadUrl: assets?.linuxDeb?.browser_download_url || assets?.linuxAppImage?.browser_download_url,
      filename: assets?.linuxDeb?.name || assets?.linuxAppImage?.name,
      sizeFormatted: formatFileSize(assets?.linuxDeb?.size || assets?.linuxAppImage?.size),
    },
  ];
}
