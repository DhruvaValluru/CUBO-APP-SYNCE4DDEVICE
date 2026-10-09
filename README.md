# CUBO Synced App

An **AI-powered driving safety app** that connects to the CUBO dash device to monitor distracted driving, track driver behavior, and give parents or users clear reports to improve safety.

## Features

- **Driver Distraction Score** — real-time safety rating (0–100)
- **Distraction Time Tracking** — daily breakdowns of distraction events
- **Goals & Insights** — actionable goals like minimizing phone distractions and keeping attention on the highway
- **Trends Dashboard** — track distractions per minute over time
- **App Focus Block** — block distracting apps while driving
- **Vehicle Management** — manage and monitor connected vehicles

## 🎥 App Demo

[![CUBO App Demo](https://img.youtube.com/vi/7hDUQYFQ1TE/0.jpg)](https://www.youtube.com/watch?v=7hDUQYFQ1TE)

▶️ [Watch the full app demo on YouTube](https://www.youtube.com/watch?v=7hDUQYFQ1TE)

## Tech Stack

- React Native / Expo
- TypeScript
- React Native Paper (Material 3)

## Design System

The UI follows the **Material 3 (Material You)** system used by the redesigned Fitbit app, built with
[React Native Paper](https://callstack.github.io/react-native-paper/):

- **Type:** *Cubo Sans* — static instances of Google Sans Flex (SIL OFL 1.1), the open release of the Google Sans
  family Fitbit uses. See `assets/fonts/README.md`.
- **Colour:** near-white canvas, dark-navy ink, flat white cards, and one pastel tonal family per metric. Primary
  roles are generated from the CUBO green seed `#00A86B` with Google's material-color-utilities
  (`src/theme/material.ts`).
- **Components:** M3 navigation bar, top app bars, cards, chips, list items, switches and progress bars.
- **Motion:** Material defaults (navigation-bar indicator, ripples, switches) plus the real CUBO unit tilting on its
  stand, from background-removed photos (`src/components/CuboStand.tsx`).

## Design References

[`design/ui-templates`](design/ui-templates) — 129 mobile UI templates in 32 categories, extracted from [Awesome-UI-Templates](https://github.com/KKshitiz/Awesome-UI-Templates), with the CUBO-relevant ones (auto, maps, health, finance dashboards) at the top.

---

## 🔗 Connected Project: CUBO MediaPipe/YOLO Distraction Detector

The core computer vision engine that powers the distraction detection — uses **MediaPipe Face Mesh** for head-pose estimation and **YOLOv8** for phone detection.

[![GitHub](https://img.shields.io/badge/GitHub-CUBO--MEDIAPIPE--YOLO--DEMO-181717?style=for-the-badge&logo=github)](https://github.com/DhruvaValluru/CUBO-MEDIAPIPE-YOLO-DEMO)

---

<p align="center">
  <a href="mailto:dhruva.valluru@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
  &nbsp;
  <a href="https://www.linkedin.com/in/dhruvavalluru"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  &nbsp;
  <a href="https://github.com/DhruvaValluru"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
</p>
