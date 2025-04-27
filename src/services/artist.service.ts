import { v4 as uuidv4 } from 'uuid';
import { Artist, CreateArtistDto, UpdateArtistDto } from '../models/artist.model';

// In-memory data store for artists
export const artists: Artist[] = [];

// Initialize with some mock artists
function initMockArtists() {
  if (artists.length === 0) {
    const mockArtists: CreateArtistDto[] = [
      {
        name: 'The Weeknd',
        genre: 'R&B',
        bio: 'Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer-songwriter and record producer.',
        imageUrl: 'https://example.com/images/the-weeknd.jpg'
      },
      {
        name: 'Taylor Swift',
        genre: 'Pop',
        bio: 'Taylor Alison Swift is an American singer-songwriter. Her discography spans multiple genres, and her narrative songwriting is often inspired by her personal life.',
        imageUrl: 'https://example.com/images/taylor-swift.jpg'
      },
      {
        name: 'Kendrick Lamar',
        genre: 'Hip Hop',
        bio: 'Kendrick Lamar Duckworth is an American rapper, songwriter, and record producer. He is often cited as one of the most influential rappers of his generation.',
        imageUrl: 'https://example.com/images/kendrick-lamar.jpg'
      },
      {
        name: 'Billie Eilish',
        genre: 'Pop',
        bio: 'Billie Eilish Pirate Baird O\'Connell is an American singer and songwriter. She first gained attention in 2015 with her debut single "Ocean Eyes".',
        imageUrl: 'https://example.com/images/billie-eilish.jpg'
      }
    ];

    mockArtists.forEach(artistData => {
      createArtist(artistData);
    });
  }
}

// Initialize mock data
initMockArtists();

/**
 * Get all artists
 */
export function findAllArtists(): Artist[] {
  return artists;
}

/**
 * Find artist by ID
 */
export function findArtistById(id: string): Artist | undefined {
  return artists.find(artist => artist.id === id);
}

/**
 * Create a new artist
 */
export function createArtist(artistData: CreateArtistDto): Artist {
  const newArtist: Artist = {
    id: uuidv4(),
    name: artistData.name,
    genre: artistData.genre,
    bio: artistData.bio,
    imageUrl: artistData.imageUrl,
    createdAt: new Date()
  };

  artists.push(newArtist);
  return newArtist;
}

/**
 * Update an existing artist
 */
export function updateArtist(id: string, updateData: UpdateArtistDto): Artist | null {
  const artistIndex = artists.findIndex(artist => artist.id === id);
  
  if (artistIndex === -1) {
    return null;
  }
  
  const artist = artists[artistIndex];
  
  // Update only the provided fields
  const updatedArtist: Artist = {
    ...artist,
    name: updateData.name ?? artist.name,
    genre: updateData.genre ?? artist.genre,
    bio: updateData.bio ?? artist.bio,
    imageUrl: updateData.imageUrl ?? artist.imageUrl,
    updatedAt: new Date()
  };
  
  // Update the artist in the array
  artists[artistIndex] = updatedArtist;
  
  return updatedArtist;
}

/**
 * Delete an artist
 */
export function deleteArtist(id: string): boolean {
  const initialLength = artists.length;
  const remainingArtists = artists.filter(artist => artist.id !== id);
  
  // Update the array with remaining artists
  artists.length = 0;
  artists.push(...remainingArtists);
  
  return artists.length < initialLength;
} 