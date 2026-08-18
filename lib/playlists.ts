export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number;
  videoId: string;
};

export type SceneKey = "morning" | "evening" | "night";

/**
 * Add a song by adding one object to the relevant array below.
 * `year` is left at 0 where the original release year isn't confirmed —
 * these are folk/devotional recordings, not verified film credits.
 * `duration` is left at 0; it's filled in live from the YouTube player
 * once a track loads.
 */

export const morningPlaylist: Track[] = [
  { id: "morning-1", title: "Kelwa Ke Paat Par", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "knZ8b5YnQiY" },
  { id: "morning-5", title: "Kaanch Hi Baans Ke Bahangiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "Eyq7vfxu4iA" },
  { id: "morning-8", title: "Pahile Pahil Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "6nPhZkZF4kk" },
  { id: "morning-4", title: "Chhathi Mai Ke Mahima", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "LhKaBKOmM4w" },
  { id: "morning-21", title: "Aragh Ke Beriya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "N3u5P5PjKQU" },
  { id: "morning-3", title: "Hey Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "x9_3sARy_Kw" },
  { id: "morning-19", title: "Suruj Dev Ke Arghiya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "usdgRYlkd2E" },
  { id: "morning-15", title: "Suna Ae Chhathi Maiya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "-W7qaLrUHvc" },
  { id: "morning-18", title: "Sava Lakh Ke Saare Bheeje", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "OERYH8EC1hA" },
  { id: "morning-9", title: "Chhathi Maiya Bulaye", artist: "Vishal Mishra", film: "Chhath Geet", year: 0, duration: 0, videoId: "OrlnX9zM5-k" },
  { id: "morning-13", title: "Chhathi Maiya Ke Geet", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "BKoD7bTLc2k" },
  { id: "morning-17", title: "Bhor Bhail", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "XP6vUVZeSwg" },
  { id: "morning-11", title: "Ganga Ji Ke Paniya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "wJ7p79QWgLg" },
  { id: "morning-14", title: "Sona Satkuniya Ho Dinanaath", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "fwX2g9jjo1o" },
  { id: "morning-12", title: "Patna Ke Ghat Par", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "VkYrntXiEX8" },
  { id: "morning-2", title: "Uga Ho Suruj Dev", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "6e6Hp6R5SVU" },
  { id: "morning-6", title: "Runi Jhuni Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "JtsrEMz8Rz4" },
  { id: "morning-20", title: "Chhathi Maiya Ke Pujan", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "er0EO-Zp904" },
  { id: "morning-16", title: "Chhathi Maiya Ho", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "er0EO-Zp904" },
  { id: "morning-10", title: "Devo Chhath Uga Hey Surujdev", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "2RR-GcqTfhU" },
  { id: "morning-7", title: "Din Nath Sun Le Arji", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "KWvgJvM2zT0" },
  { id: "morning-22", title: "Chhathi Maiya Bulaye", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "v8yOzkbsMaQ" },
];

export const eveningPlaylist: Track[] = [
  { id: "evening-4", title: "Uga Ho Suruj Dev", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "6e6Hp6R5SVU" },
  { id: "evening-12", title: "Suna Ae Chhathi Maiya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "-W7qaLrUHvc" },
  { id: "evening-14", title: "Suruj Dev Ke Arghiya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "usdgRYlkd2E" },
  { id: "evening-3", title: "Chhath Ke Baratiya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "bL6rp6eI_2k" },
  { id: "evening-15", title: "Chhathi Maiya Ho", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "er0EO-Zp904" },
  { id: "evening-9", title: "Din Nath Sun Le Arji", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "KWvgJvM2zT0" },
  { id: "evening-10", title: "Ganga Ji Ke Paniya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "wJ7p79QWgLg" },
  { id: "evening-7", title: "Runi Jhuni Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "JtsrEMz8Rz4" },
  { id: "evening-5", title: "Pahile Pahil Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "6nPhZkZF4kk" },
  { id: "evening-13", title: "Aragh Ke Beriya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "N3u5P5PjKQU" },
  { id: "evening-18", title: "Chhathi Maiya Bulaye", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "v8yOzkbsMaQ" },
  { id: "evening-2", title: "Kaanch Hi Baans Ke Bahangiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "W-w55hqwyUs" },
  { id: "evening-17", title: "Jode Jode Falwa", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "2Uh-rMxhBLY" },
  { id: "evening-1", title: "Kelwa Ke Paat Par", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "y7hrM7PouQM" },
  { id: "evening-16", title: "Chhathi Maiya Ke Pujan", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "er0EO-Zp904" },
  { id: "evening-6", title: "Hey Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "x9_3sARy_Kw" },
  { id: "evening-11", title: "Patna Ke Ghat Par", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "VkYrntXiEX8" },
  { id: "evening-8", title: "Chhathi Mai Ke Mahima", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "LhKaBKOmM4w" },
];

export const nightPlaylist: Track[] = [
  { id: "night-7", title: "Din Nath Sun Le Arji", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "KWvgJvM2zT0" },
  { id: "night-6", title: "Chhathi Mai Ke Mahima", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "LhKaBKOmM4w" },
  { id: "night-14", title: "Ugi Hey Dinanath", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "px11PiCUUy8" },
  { id: "night-12", title: "Aragh Ke Beriya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "N3u5P5PjKQU" },
  { id: "night-15", title: "Chhathi Maiya Bulaye", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "v8yOzkbsMaQ" },
  { id: "night-8", title: "Ganga Ji Ke Paniya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "wJ7p79QWgLg" },
  { id: "night-5", title: "Runi Jhuni Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "JtsrEMz8Rz4" },
  { id: "night-11", title: "Chhathi Maiya Ke Pujan", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "er0EO-Zp904" },
  { id: "night-10", title: "Chhathi Maiya Ho", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "er0EO-Zp904" },
  { id: "night-9", title: "Suna Ae Chhathi Maiya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "-W7qaLrUHvc" },
  { id: "night-3", title: "Kelwa Ke Paat Par", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "knZ8b5YnQiY" },
  { id: "night-2", title: "Kaanch Hi Baans Ke Bahangiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "Eyq7vfxu4iA" },
  { id: "night-1", title: "Pahile Pahil Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "6nPhZkZF4kk" },
  { id: "night-13", title: "Suruj Dev Ke Arghiya", artist: "Traditional", film: "Chhath Geet", year: 0, duration: 0, videoId: "usdgRYlkd2E" },
  { id: "night-4", title: "Hey Chhathi Maiya", artist: "Sharda Sinha", film: "Chhath Geet", year: 0, duration: 0, videoId: "x9_3sARy_Kw" },
];

export const playlists: Record<SceneKey, Track[]> = {
  morning: morningPlaylist,
  evening: eveningPlaylist,
  night: nightPlaylist,
};

export const sceneCopy: Record<SceneKey, { label: string; mood: string }> = {
  morning: { label: "Morning", mood: "fresh, warm, early-ghat peace" },
  evening: { label: "Evening", mood: "golden, nostalgic, magical dusk" },
  night: { label: "Night", mood: "intimate, deep, diya-lit calm" },
};