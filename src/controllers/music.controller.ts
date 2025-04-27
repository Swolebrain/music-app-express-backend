import { Request, Response } from 'express';
import * as musicService from '../services/music.service';
import * as artistService from '../services/artist.service';
import { CreateMusicTrackDto } from '../models/music.model';

/**
 * Get all tracks
 */
export const getAllTracks = (req: Request, res: Response): void => {
  try {
    const tracks = musicService.findAllTracks();
    res.status(200).json(tracks);
  } catch (error) {
    console.error('Error getting tracks:', error);
    res.status(500).json({ message: 'Failed to retrieve tracks' });
  }
};

/**
 * Get tracks by artist ID
 */
export const getTracksByArtistId = (req: Request, res: Response): void => {
  try {
    const { artistId } = req.params;
    
    if (!artistId) {
      res.status(400).json({ message: 'Artist ID is required' });
      return;
    }
    
    // Verify artist exists
    const artist = artistService.findArtistById(artistId);
    if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    
    const tracks = musicService.findTracksByArtistId(artistId);
    res.status(200).json(tracks);
  } catch (error) {
    console.error('Error getting tracks by artist:', error);
    res.status(500).json({ message: 'Failed to retrieve tracks' });
  }
};

/**
 * Create a new music track
 */
export const createTrack = (req: Request, res: Response): void => {
  try {
    const trackData: CreateMusicTrackDto = req.body;
    
    // Basic validation
    if (!trackData.title || !trackData.artistId || !trackData.genre || !trackData.duration) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    
    // Verify artist exists
    const artist = artistService.findArtistById(trackData.artistId);
    if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    
    const newTrack = musicService.createTrack(trackData);
    res.status(201).json(newTrack);
  } catch (error) {
    console.error('Error creating track:', error);
    res.status(500).json({ message: 'Failed to create track' });
  }
};

/**
 * Stream a music track
 */
export const streamTrack = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Track ID is required' });
      return;
    }
    
    const streamData = musicService.streamTrack(id);
    
    if (!streamData) {
      res.status(404).json({ message: 'Track not found' });
      return;
    }
    
    res.status(200).json(streamData);
  } catch (error) {
    console.error('Error streaming track:', error);
    res.status(500).json({ message: 'Failed to stream track' });
  }
};

/**
 * Download a music track
 */
export const downloadTrack = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Track ID is required' });
      return;
    }
    
    const downloadData = musicService.downloadTrack(id);
    
    if (!downloadData) {
      res.status(404).json({ message: 'Track not found' });
      return;
    }
    
    // In a real app, we'd stream the file to the client
    // Here we just return mock data
    res.status(200).json({
      message: 'Download started',
      fileName: downloadData.fileName,
      filePath: downloadData.filePath,
      artistName: downloadData.artistName
    });
  } catch (error) {
    console.error('Error downloading track:', error);
    res.status(500).json({ message: 'Failed to download track' });
  }
};

/**
 * Mark a track as favorite
 */
export const favoriteTrack = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Track ID is required' });
      return;
    }
    
    const result = musicService.favoriteTrack(id);
    
    if (!result) {
      res.status(404).json({ message: 'Track not found' });
      return;
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error favoriting track:', error);
    res.status(500).json({ message: 'Failed to update favorite status' });
  }
}; 