# Development Guide

This document describes the package management, runtime scripts, and verification commands for the repository.

## Package Manager: Bun

This project uses **[Bun](https://bun.sh)** (version `1.3.11`+) as its primary package manager and runtime runner.

```bash
# Install dependencies
bun install

# Start local Next.js development server
bun dev

# Build for production
bun run build

# Start production server
bun run start

# Run unit tests
bun run test

# Run End-to-End tests
bun run test:e2e

# Run architecture, palette, and template isolation checks
bun run check

# Run linter
bun run lint
```

## Lockfile

The repository uses `bun.lock`. Do not commit `package-lock.json` or `yarn.lock`.
Ensure `bun.lock` is committed with any dependency changes.
