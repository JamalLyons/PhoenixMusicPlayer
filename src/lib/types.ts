export type PlatformKey = 'macos-arm' | 'macos-intel' | 'windows' | 'linux';

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count?: number;
}

export interface ReleaseInfo {
  version: string;
  publishedAt: string;
  htmlUrl: string;
  /** True only when GitHub returned a real latest release with at least one asset. */
  available: boolean;
  assets: {
    macosArm?: ReleaseAsset;
    macosIntel?: ReleaseAsset;
    windows?: ReleaseAsset;
    linuxDeb?: ReleaseAsset;
    linuxAppImage?: ReleaseAsset;
  };
}

export interface PlatformOption {
  key: PlatformKey;
  label: string;
  sublabel: string;
  arch: string;
  fileExt: string;
  icon: string;
  downloadUrl?: string;
  filename?: string;
  sizeFormatted?: string;
}
