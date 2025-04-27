/**
 * Artist Model
 */
export interface Artist {
  id: string;
  name: string;
  genre: string;
  bio: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Create Artist DTO
 */
export interface CreateArtistDto {
  name: string;
  genre: string;
  bio: string;
  imageUrl?: string;
}

/**
 * Update Artist DTO
 */
export interface UpdateArtistDto {
  name?: string;
  genre?: string;
  bio?: string;
  imageUrl?: string;
} 