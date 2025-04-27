# Music App Express Backend

A TypeScript-based Express.js backend for a music application.

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
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

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

3. Set up environment variables
   ```sh
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Development

Start the development server with hot reloading:
```sh
npm run dev
# or
yarn dev
```

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

- `GET /health` - Health check endpoint
- `GET /api` - Welcome message

## Testing

Run the tests:
```sh
npm test
# or
yarn test
``` 