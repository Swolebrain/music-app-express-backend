import { v4 as uuidv4 } from 'uuid';
import { MusicTrack, CreateMusicTrackDto, FavoriteResponse, StreamResponse, ArtistAnalytics } from '../models/music.model';
import { artists, findArtistById } from './artist.service';

// In-memory data store
export const musicTracks: MusicTrack[] = [];
const favorites: string[] = []; // List of favorited track IDs
const streamEvents: { trackId: string, timestamp: Date }[] = [];

// Initialize with some mock tracks
function initMockTracks() {
  // Wait until we have artists before creating mock tracks
  setTimeout(() => {
    if (musicTracks.length === 0 && artists.length > 0) {
      const mockTracks: CreateMusicTrackDto[] = [
        {
          title: 'Blinding Lights',
          artistId: artists[0].id, // The Weeknd
          genre: 'R&B',
          duration: 200, // 3:20
          releaseDate: new Date('2019-11-29')
        },
        {
          title: 'Save Your Tears',
          artistId: artists[0].id, // The Weeknd
          genre: 'R&B',
          duration: 215, // 3:35
          releaseDate: new Date('2020-08-09')
        },
        {
          title: 'Anti-Hero',
          artistId: artists[1].id, // Taylor Swift
          genre: 'Pop',
          duration: 200, // 3:20
          releaseDate: new Date('2022-10-21')
        },
        {
          title: 'Cruel Summer',
          artistId: artists[1].id, // Taylor Swift
          genre: 'Pop',
          duration: 178, // 2:58
          releaseDate: new Date('2019-08-23')
        },
        {
          title: 'HUMBLE.',
          artistId: artists[2].id, // Kendrick Lamar
          genre: 'Hip Hop',
          duration: 177, // 2:57
          releaseDate: new Date('2017-03-30')
        },
        {
          title: 'Bad Guy',
          artistId: artists[3].id, // Billie Eilish
          genre: 'Pop',
          duration: 194, // 3:14
          releaseDate: new Date('2019-03-29')
        }
      ];

      mockTracks.forEach(trackData => {
        createTrack(trackData);
      });

      // Mark some tracks as favorites
      if (musicTracks.length >= 3) {
        favoriteTrack(musicTracks[0].id); // Favorite "Blinding Lights"
        favoriteTrack(musicTracks[2].id); // Favorite "Anti-Hero"
      }
    }
  }, 100); // Small delay to ensure artists are loaded
}

// Initialize mock data
initMockTracks();

/**
 * Create a new music track
 */
export function createTrack(trackData: CreateMusicTrackDto): MusicTrack {
  // Verify that the artist exists
  const artist = findArtistById(trackData.artistId);
  if (!artist) {
    throw new Error(`Artist with ID ${trackData.artistId} not found`);
  }

  const newTrack: MusicTrack = {
    id: uuidv4(),
    title: trackData.title,
    artistId: trackData.artistId,
    genre: trackData.genre,
    duration: trackData.duration,
    releaseDate: trackData.releaseDate || new Date(),
    createdAt: new Date(),
    isFavorite: false
  };

  musicTracks.push(newTrack);
  return newTrack;
}

/**
 * Find a track by ID
 */
export function findTrackById(id: string): MusicTrack | undefined {
  return musicTracks.find(track => track.id === id);
}

/**
 * Find all tracks
 */
export function findAllTracks(): MusicTrack[] {
  return musicTracks;
}

/**
 * Find tracks by artist ID
 */
export function findTracksByArtistId(artistId: string): MusicTrack[] {
  return musicTracks.filter(track => track.artistId === artistId);
}

/**
 * Get stream details for a track
 */
export function streamTrack(id: string): StreamResponse | null {
  const track = findTrackById(id);
  
  if (!track) {
    return null;
  }

  // Find artist name
  const artist = findArtistById(track.artistId);

  // Record streaming event
  streamEvents.push({
    trackId: id,
    timestamp: new Date()
  });

  // Generate mock streaming URL
  const streamUrl = `https://music-app-stream.example.com/stream/${id}?token=${Math.random().toString(36).substring(2, 15)}`;
  
  return {
    id: track.id,
    title: track.title,
    streamUrl,
    message: `Stream started for "${track.title}" by ${artist?.name || 'Unknown Artist'}`,
    artistId: track.artistId,
    artistName: artist?.name
  };
}

/**
 * Get mock download details for a track
 */
export function downloadTrack(id: string): { filePath: string, fileName: string, artistName?: string } | null {
  const track = findTrackById(id);
  
  if (!track) {
    return null;
  }
  
  // Find artist name
  const artist = findArtistById(track.artistId);
  const artistName = artist?.name || 'Unknown Artist';
  
  // Mock file details (not actually creating a file)
  const fileName = `${artistName} - ${track.title}.mp4`.replace(/\s+/g, '_');
  const filePath = `/downloads/${fileName}`;
  
  return {
    filePath,
    fileName,
    artistName
  };
}

/**
 * Mark a track as favorite
 */
export function favoriteTrack(id: string): FavoriteResponse | null {
  const trackIndex = musicTracks.findIndex(track => track.id === id);
  
  if (trackIndex === -1) {
    return null;
  }
  
  const track = musicTracks[trackIndex];
  
  // Toggle favorite status
  if (!track.isFavorite) {
    track.isFavorite = true;
    favorites.push(id);
  } else {
    track.isFavorite = false;
    const favIndex = favorites.indexOf(id);
    if (favIndex !== -1) {
      favorites.splice(favIndex, 1);
    }
  }
  
  // Update the track in the array
  musicTracks[trackIndex] = track;
  
  // Find artist name
  const artist = findArtistById(track.artistId);
  const artistName = artist?.name || 'Unknown Artist';
  
  return {
    id: track.id,
    isFavorite: track.isFavorite,
    message: track.isFavorite 
      ? `Track "${track.title}" by ${artistName} added to favorites` 
      : `Track "${track.title}" by ${artistName} removed from favorites`
  };
}

/**
 * Get artist analytics
 */
export function getArtistAnalytics(artistId?: string): ArtistAnalytics {
  // Filter tracks by artist if artistId is provided
  const artistTracks = artistId 
    ? musicTracks.filter(track => track.artistId === artistId)
    : musicTracks;

  // Count tracks by genre
  const genreCounts: Record<string, number> = {};
  artistTracks.forEach(track => {
    genreCounts[track.genre] = (genreCounts[track.genre] || 0) + 1;
  });
  
  // Convert to array and sort by count descending
  const topGenres = Object.entries(genreCounts)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count);
  
  // Count favorites for this artist
  const artistFavorites = artistId
    ? artistTracks.filter(track => track.isFavorite).length
    : favorites.length;
  
  // Calculate total stream time for this artist
  const artistStreamEvents = artistId
    ? streamEvents.filter(event => {
        const track = musicTracks.find(t => t.id === event.trackId);
        return track && track.artistId === artistId;
      })
    : streamEvents;
  
  const totalStreamTime = artistStreamEvents.reduce((total, event) => {
    const track = musicTracks.find(t => t.id === event.trackId);
    return total + (track ? track.duration : 0);
  }, 0);
  
  // Calculate average track duration for this artist
  const totalDuration = artistTracks.reduce((sum, track) => sum + track.duration, 0);
  const averageTrackDuration = artistTracks.length > 0 ? totalDuration / artistTracks.length : 0;
  
  return {
    totalTracks: artistTracks.length,
    totalFavorites: artistFavorites,
    topGenres,
    totalStreamTime,
    averageTrackDuration
  };
} 