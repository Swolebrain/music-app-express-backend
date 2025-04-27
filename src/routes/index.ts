import express from 'express';
import * as musicController from '../controllers/music.controller';
import * as artistController from '../controllers/artist.controller';

const router = express.Router();

// Music routes
router.get('/music', musicController.getAllTracks);
router.post('/music', musicController.createTrack);
router.get('/music/:id/stream', musicController.streamTrack);
router.get('/music/:id/download', musicController.downloadTrack);
router.post('/music/:id/favorite', musicController.favoriteTrack);

// Artist routes
router.get('/artists', artistController.getAllArtists);
router.post('/artists', artistController.createArtist);
router.get('/artists/:id', artistController.getArtistById);
router.put('/artists/:id', artistController.updateArtist);
router.delete('/artists/:id', artistController.deleteArtist);
router.get('/artists/:artistId/tracks', musicController.getTracksByArtistId);
router.get('/artist/analytics', artistController.getAnalytics);

// Welcome route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the music app API' });
});

// Example of how to import and use other route modules
// import userRoutes from './user.routes';
// router.use('/users', userRoutes);

export const routes = router; 