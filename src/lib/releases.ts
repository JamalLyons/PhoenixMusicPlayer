import type { PlatformKey, ReleaseInfo, PlatformOption } from './types';
import { RELEASES_URL } from './pricing';

const REPO_OWNER = 'JamalLyons';
const REPO_NAME = 'PhoenixMusicPlayer';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

export function detectUserPlatform(): PlatformKey {
  if (typeof window === 'undefined') return 'macos-arm';

  const userAgent = window.navigator.userAgent.toLowerCase();
  const nav = window.navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const platform = (
    nav.userAgentData?.platform ||
    window.navigator.platform ||
    ''
  ).toLowerCase();

  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }

  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux';
  }

  if (platform.includes('mac') || userAgent.includes('macintosh')) {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (typeof renderer === 'string' && renderer.includes('Apple')) {
            return 'macos-arm';
          }
        }
      }
    } catch {
      // fallback to Apple Silicon default
    }
    return 'macos-arm';
  }

  return 'macos-arm';
}

export function formatFileSize(bytes?: number): string {
  if (!bytes || Number.isNaN(bytes)) return '';
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function emptyRelease(): ReleaseInfo {
  return {
    version: '',
    publishedAt: '',
    htmlUrl: RELEASES_URL,
    available: false,
    assets: {},
  };
}

export async function fetchLatestRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      return emptyRelease();
    }

    const data = (await res.json()) as {
      tag_name?: string;
      published_at?: string;
      html_url?: string;
      assets?: Array<{
        name: string;
        browser_download_url: string;
        size: number;
        download_count?: number;
      }>;
    };

    const assets = data.assets || [];
    if (assets.length === 0) {
      return emptyRelease();
    }

    const findAsset = (pattern: RegExp) => {
      const match = assets.find((a) => pattern.test(a.name));
      if (!match) return undefined;
      return {
        name: match.name,
        browser_download_url: match.browser_download_url,
        size: match.size,
        download_count: match.download_count,
      };
    };

    const macosArm =
      findAsset(/(aarch64|arm64).*\.dmg$/i) || findAsset(/aarch64.*\.dmg$/i);
    const macosIntel = findAsset(/(x64|x86_64).*\.dmg$/i);
    const windows = findAsset(/\.exe$/i) || findAsset(/\.msi$/i);
    const linuxDeb = findAsset(/\.deb$/i);
    const linuxAppImage = findAsset(/\.AppImage$/i);

    const hasAny = Boolean(
      macosArm || macosIntel || windows || linuxDeb || linuxAppImage
    );

    return {
      version: data.tag_name || '',
      publishedAt: data.published_at || '',
      htmlUrl: data.html_url || RELEASES_URL,
      available: hasAny,
      assets: {
        macosArm,
        macosIntel,
        windows,
        linuxDeb,
        linuxAppImage,
      },
    };
  } catch (err) {
    console.warn('Could not fetch latest release info from GitHub:', err);
    return emptyRelease();
  }
}

export function getPlatformOptions(release?: ReleaseInfo): PlatformOption[] {
  const assets = release?.assets;
  const available = release?.available === true;

  return [
    {
      key: 'macos-arm',
      label: 'macOS',
      sublabel: 'Apple Silicon',
      arch: 'ARM64',
      fileExt: '.dmg',
      icon: 'apple',
      downloadUrl: available ? assets?.macosArm?.browser_download_url : undefined,
      filename: assets?.macosArm?.name,
      sizeFormatted: formatFileSize(assets?.macosArm?.size),
    },
    {
      key: 'macos-intel',
      label: 'macOS',
      sublabel: 'Intel',
      arch: 'x64',
      fileExt: '.dmg',
      icon: 'apple',
      downloadUrl: available ? assets?.macosIntel?.browser_download_url : undefined,
      filename: assets?.macosIntel?.name,
      sizeFormatted: formatFileSize(assets?.macosIntel?.size),
    },
    {
      key: 'windows',
      label: 'Windows',
      sublabel: 'Windows 10 / 11',
      arch: 'x64',
      fileExt: '.exe',
      icon: 'monitor',
      downloadUrl: available ? assets?.windows?.browser_download_url : undefined,
      filename: assets?.windows?.name,
      sizeFormatted: formatFileSize(assets?.windows?.size),
    },
    {
      key: 'linux',
      label: 'Linux',
      sublabel: 'Debian / AppImage',
      arch: 'x64',
      fileExt: '.deb',
      icon: 'terminal',
      downloadUrl: available
        ? assets?.linuxDeb?.browser_download_url ||
          assets?.linuxAppImage?.browser_download_url
        : undefined,
      filename: assets?.linuxDeb?.name || assets?.linuxAppImage?.name,
      sizeFormatted: formatFileSize(
        assets?.linuxDeb?.size || assets?.linuxAppImage?.size
      ),
    },
  ];
}
