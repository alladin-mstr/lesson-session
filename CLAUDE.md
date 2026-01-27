# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive presentation and real-time multiplayer quiz app built with React (frontend) and Node.js WebSocket server (backend). The presentation covers usability principles from "Don't Make Me Think, Revisited" and includes an embedded live quiz where participants join via their phones.

## Commands

- `npm run dev` — Run client (Vite) and WebSocket server concurrently
- `npm run dev:client` — Vite dev server only
- `npm run dev:server` — WebSocket server only (tsx, port 3001)
- `npm run build` — Build frontend to `dist/`
- `npm run start` — Production server (serves `dist/` + WebSocket on same port)
- `npx tsc --noEmit` — Type-check without emitting

## Architecture

**Frontend** (`src/`): React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui (vega style).

**Backend** (`server/`): Node.js HTTP server with WebSocket (`ws` library). In development, WebSocket runs standalone on port 3001 with Vite proxying `/ws`. In production, a single HTTP server serves static files from `dist/` and handles WebSocket upgrades on the same port.

**Routing**: Hash-based — `#/quiz/host` (host view), `#/quiz/play` (player view), default shows the presentation. Handled in `src/App.tsx`.

**Path alias**: `@/*` maps to `src/*` (configured in both Vite and tsconfig).

### Quiz System

Two-role WebSocket architecture:
- **Host** (`QuizHost.tsx`) controls game phases: lobby → question → answer_reveal → leaderboard → finished
- **Player** (`QuizPlayer.tsx`) joins with nickname, answers questions, sees results
- **Server** (`server/game-state.ts`) manages state machine, tracks players, broadcasts events
- **Scoring** (`server/scoring.ts`): 1000 base + up to 500 time bonus + 100×streak (max 5x)
- **Questions** defined in `src/data/quiz-questions.ts` (20 main + 5 bonus interleaved)

WebSocket message types are defined in `src/types/quiz.ts` (ClientMessage/ServerMessage discriminated unions).

### Presentation

Slide definitions live in `src/slides/slides.ts`. The `Presentation.tsx` component handles keyboard navigation and renders slides by type (`title`, `content`, `list`). Slide state is stored in URL search params (`?slide=N`).

## Deployment

Deploys to Railway.app (`railway.json`). The production server reads `PORT` from environment (defaults to 3000). No other environment variables required.
