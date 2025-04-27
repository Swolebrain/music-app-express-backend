/**
 * Music Track Model
 */
export interface MusicTrack {
  id: string;
  title: string;
  artistId: string;
  genre: string;
  duration: number; // duration in seconds
  releaseDate: Date;
  createdAt: Date;
  isFavorite: boolean;
}

/**
 * Create Music Track DTO (Data Transfer Object)
 */
export interface CreateMusicTrackDto {
  title: string;
  artistId: string;
  genre: string;
  duration: number;
  releaseDate?: Date;
}

/**
 * Favorite Response
 */
export interface FavoriteResponse {
  id: string;
  isFavorite: boolean;
  message: string;
}

/**
 * Stream Response
 */
export interface StreamResponse {
  id: string;
  title: string;
  streamUrl: string;
  message: string;
  artistId: string;
  artistName?: string;
}

/**
 * Analytics Data
 */
export interface ArtistAnalytics {
  totalTracks: number;
  totalFavorites: number;
  topGenres: { genre: string; count: number }[];
  totalStreamTime: number; // in seconds
  averageTrackDuration: number; // in seconds
} 