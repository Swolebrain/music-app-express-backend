# Music App Express Backend

A TypeScript-based Express.js backend for a music application with in-memory data storage.

## Project Structure

```
music-app-express-backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # Data models/interfaces
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── index.ts         # Entry point
├── .gitignore           # Git ignore file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## About the App

This is a toy music app backend with in-memory data storage (no database). It provides endpoints for managing artists and music tracks, streaming, downloading, and analytics.

All data is stored in memory and will be lost when the server restarts. The app initializes with mock data for artists and tracks for demonstration purposes.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/music-app-express-backend.git
   cd music-app-express-backend
   ```

2. Install dependencies
   ```sh
   npm install
   # or
   yarn install
   ```

### Development

Start the development server with hot reloading:
```sh
npm run dev
# or
yarn dev
```

The server will run on port 3000 by default.

### Building for Production

Build the TypeScript code:
```sh
npm run build
# or
yarn build
```

Start the production server:
```sh
npm start
# or
yarn start
```

## API Endpoints

### Music Endpoints

- `GET /music` - Get all music tracks
- `POST /music` - Create a new music track
  - Request body: `{ "title": "Song Title", "artistId": "artist-uuid", "genre": "Pop", "duration": 180 }`

- `GET /music/:id/stream` - Stream a music track
  - Returns: JSON with a mocked streaming URL

- `GET /music/:id/download` - Download a music track
  - Returns: JSON with a mocked download path for an MP4 file

- `POST /music/:id/favorite` - Mark a track as favorite
  - Toggles the favorite status of the track

### Artist Endpoints

- `GET /artists` - Get all artists
- `POST /artists` - Create a new artist
  - Request body: `{ "name": "Artist Name", "genre": "Pop", "bio": "Artist biography" }`
- `GET /artists/:id` - Get an artist by ID
- `PUT /artists/:id` - Update an artist
  - Request body: `{ "name": "Updated Name", "genre": "Updated Genre", "bio": "Updated bio" }`
- `DELETE /artists/:id` - Delete an artist
- `GET /artists/:artistId/tracks` - Get all tracks for an artist

- `GET /artist/analytics` - Get analytics for the current user
  - Returns: Statistics about tracks, favorites, and streaming

### Other Endpoints

- `GET /health` - Health check endpoint
- `GET /` - Welcome message

## Testing

Run the tests:
```sh
npm test
# or
yarn test
``` 