import { Request, Response } from 'express';
import * as musicService from '../services/music.service';
import * as artistService from '../services/artist.service';
import { CreateArtistDto, UpdateArtistDto } from '../models/artist.model';

/**
 * Get all artists
 */
export function getAllArtists(req: Request, res: Response): void {
  try {
    const artists = artistService.findAllArtists();
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error getting artists:', error);
    res.status(500).json({ message: 'Failed to retrieve artists' });
  }
}

/**
 * Get artist by ID
 */
export function getArtistById(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Artist ID is required' });
      return;
    }
    
    const artist = artistService.findArtistById(id);
    
    if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    
    res.status(200).json(artist);
  } catch (error) {
    console.error('Error getting artist:', error);
    res.status(500).json({ message: 'Failed to retrieve artist' });
  }
}

/**
 * Create a new artist
 */
export function createArtist(req: Request, res: Response): void {
  try {
    const artistData: CreateArtistDto = req.body;
    
    // Basic validation
    if (!artistData.name || !artistData.genre || !artistData.bio) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    
    const newArtist = artistService.createArtist(artistData);
    res.status(201).json(newArtist);
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(500).json({ message: 'Failed to create artist' });
  }
}

/**
 * Update an artist
 */
export function updateArtist(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const updateData: UpdateArtistDto = req.body;
    
    if (!id) {
      res.status(400).json({ message: 'Artist ID is required' });
      return;
    }
    
    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: 'No update data provided' });
      return;
    }
    
    const updatedArtist = artistService.updateArtist(id, updateData);
    
    if (!updatedArtist) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    
    res.status(200).json(updatedArtist);
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ message: 'Failed to update artist' });
  }
}

/**
 * Delete an artist
 */
export function deleteArtist(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Artist ID is required' });
      return;
    }
    
    const isDeleted = artistService.deleteArtist(id);
    
    if (!isDeleted) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ message: 'Failed to delete artist' });
  }
}

/**
 * Get analytics for an artist
 */
export function getAnalytics(req: Request, res: Response): void {
  try {
    // In a real app, we'd get the current user/artist from auth
    // For this toy app, we'll just return analytics for all tracks
    
    const analytics = musicService.getArtistAnalytics();
    
    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ message: 'Failed to retrieve analytics' });
  }
} 