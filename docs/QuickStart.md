# Quick Start

A guide to get you up and running with IdeaSphere.

## Prerequisites

- [Node.js](https://nodejs.org/) (version can be found in `.nvmrc`)
- [pnpm](https://pnpm.io/) (version can be found in `package.json`)
- A project on [Supabase](https://supabase.io/)
- A phone with [Expo Go](https://expo.io/client) installed or a simulator (Xcode or Android Studio)

## Config

Copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env
```

Variables are described in the file and you can find most of them in your Supabase project settings.

## Install dependencies

```bash
pnpm i
```

## Database

```bash
# Generate the database schema
pnpm db:generate

# And push the schema to Supabase
# You will have to do this every time you change the schema
pnpm db:push
```

## Run in development mode

```bash
# Run all apps with one command
pnpm dev

# Or run them individually in separate terminals (this method is necessary if you need expo QR code or interactive terminal)
pnpm -F nextjs dev
pnpm -F expo dev
# Prisma Studio is not necessary for development, but it can be useful
pnpm -F db dev

# You can choose if you want to run mobile app in simulator or on your device
# To run on device, you need to have Expo Go installed
# To run in simulator, you need to have Xcode or Android Studio installed
pnpm -F expo dev
pnpm -F expo dev:ios
pnpm -F expo dev:android
```

## Additional useful commands

```bash
# Type check all apps
pnpm typecheck

# Lint all apps
pnpm lint
# And fix all auto-fixable issues
pnpm lint:fix

# Check if all files are formatted
pnpm format
# Or format all files
pnpm format:fix
```
