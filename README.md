# IdeaSphere

No idea what to do with your free time? Try IdeaSphere!

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Generate prisma client
pnpm db:generate
# Or push your schema to the database
pnpm db:push

# Run locally
pnpm dev
```
