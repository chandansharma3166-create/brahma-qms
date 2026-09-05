# Brahma QMS — NEET Question Management System

A high-performance, offline-first Question Management and Computer-Based Testing (CBT) platform tailored for NEET aspirants. Built with Next.js 16 (Turbopack), React 19, TypeScript, and Tailwind CSS v4.

---

## Core Architecture & Modules

* **Student Command Dashboard (`/`)**: High-yield readiness metrics, subject mastery breakdowns, and quick action cards.
* **Question Explorer (`/explorer`)**: Interactive problem bank with chapter/difficulty filters, instant feedback, and expandable NCERT solutions.
* **Spaced Repetition Revision Center (`/revision`)**: Automated retention scheduler prioritizing missed attempts and flagged conceptual errors.
* **CBT Mock Arena (`/mock`)**: Full-screen NEET simulator with real-time countdown timer, question palette navigator, and standard marking (+4 / -1).
* **Performance Intelligence (`/analytics`)**: Detailed topic heatmap, speed distribution, and error taxonomy tracking (conceptual gaps vs. careless slips).
* **Personal Notebook (`/notebook`)**: Personal question curation with custom tags and mnemonic memory notes.
* **Custom Test Builder (`/builder`)**: Practice preset generator with custom question counts, subject mixes, and timer limits.
* **Community Hub (`/community`)**: Faculty-curated problem sets and question-specific doubt resolution threads.
* **Data Transfer Console (`/data-transfer`)**: JSON and CSV question repository export/import utility.
* **Integration Settings (`/settings`)**: Google Sheets sync trigger and daily revision targets.

---

## Technical Stack

* **Framework**: Next.js 16 (App Router, Turbopack)
* **Styling**: Tailwind CSS v4 (Sage-green study palette)
* **Mathematical Typography**: KaTeX (`katex`)
* **Icons**: Lucide React
* **Persistence & Sync**: Local Seed Data, Browser Storage, Google Sheets API CSV layer
* **Offline / PWA**: Web App Manifest (`manifest.json`) and Service Worker (`sw.js`)

---

## Getting Started

### Prerequisites
* Node.js 18.18+ or Node.js 20+
* npm, pnpm, or yarn

### 1. Installation
```bash
git clone [https://github.com/chandansharma3166-create/brahma-qms.git](https://github.com/chandansharma3166-create/brahma-qms.git)
cd brahma-qms
npm install