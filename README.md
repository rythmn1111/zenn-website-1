# Zenn Website

A Next.js website featuring a white paper on **TRUE Verifiable Sensors** - an end-to-end attestation framework for establishing Proof of Origin for sensor and camera outputs on resource-constrained devices.

## Features

- **White Paper Presentation**: Professional white paper layout for technical documentation
- **Interactive Flowcharts**: React Flow diagrams illustrating Proof of Device Identity and Proof of Execution flows
- **Custom Audio Player**: Built-in audio player with playback controls
- **Responsive Design**: Modern, clean UI built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Flowcharts**: React Flow
- **Fonts**: Manrope (via Google Fonts)
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Pages

- `/` - Home page
- `/verifiable_sensors` - TRUE Verifiable Sensors white paper
- `/v2` - Version 2 page
- `/v2-docs` - Version 2 documentation
- `/greg` - Greg page

## Project Structure

```
├── src/
│   ├── pages/              # Next.js pages
│   │   ├── verifiable_sensors.tsx  # Main white paper page
│   │   ├── v2.tsx
│   │   └── ...
│   ├── components/         # React components
│   │   ├── ProofOfExecutionFlow.tsx
│   │   └── ProofOfDeviceIdentityFlow.tsx
│   └── ...
├── public/                 # Static assets
│   ├── audio2.mp3
│   ├── logo.png
│   └── ...
└── package.json
```

## Building for Production

```bash
npm run build
```

This will:
1. Build the Next.js application
2. Export static files for deployment

## Deployment

The project is configured for deployment on Vercel. Simply push to your GitHub repository and connect it to Vercel for automatic deployments.

### Build Configuration

The project uses `next export` to generate static files, making it compatible with static hosting platforms.

## Key Components

### Verifiable Sensors White Paper

The main white paper (`/verifiable_sensors`) covers:

- **Section I**: Introduction and Threat Model
- **Section II.A**: Proof of Device Identity
  - Secure Element Chips
  - Device Keypair Generation
  - Public Key Registration
- **Section II.B**: Proof of Execution
  - Code Hashing
  - Trusted Sensor Execution Library (TSEL)
  - Batch Processing
- **Section II.C**: Proof of Freshness
  - Freshness Challenge Mechanism

### Interactive Flowcharts

The white paper includes two interactive React Flow diagrams:

1. **Proof of Device Identity Flow**: Shows the device provisioning and identity verification process
2. **Proof of Execution Flow**: Illustrates the code execution and attestation pipeline

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build and export for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility-first CSS framework
- `lucide-react` - Icon library

### Features
- `reactflow` - Interactive flowcharts
- `@vercel/analytics` - Analytics integration

## License

This project is private.

## Contributing

This is a private project. For questions or issues, please contact the repository owner.
