/** One-time Tools license price — change in one place. */
export const TOOLS_LICENSE_PRICE = 29;
export const TOOLS_LICENSE_PRICE_LABEL = `$${TOOLS_LICENSE_PRICE}`;

export const DISCORD_URL = 'https://discord.gg/TPCBTUrfNT';
export const GITHUB_URL = 'https://github.com/JamalLyons/PhoenixMusicPlayer';
export const RELEASES_URL = `${GITHUB_URL}/releases`;
/** Until Stripe ships, Tools waitlist lives on Discord. */
export const LICENSE_WAITLIST_URL = DISCORD_URL;

export const FREE_FEATURES = [
  'Local library — songs, albums, artists, genres',
  'Playback, queue, shuffle & repeat',
  'Playlists and favorites',
  'Dark & light themes with accent color',
] as const;

export const TOOLS_FEATURES = [
  'In-app audio acquisition into your library',
  'Staging inbox for new files',
  'Metadata & artwork editor',
  'Bulk edit, cleanup macros & pattern extract',
  '10-band EQ — global, per album, playlist, or track',
  'Artist/genre dedupe & album builder',
] as const;
