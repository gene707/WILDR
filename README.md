# WILDR 🌿
### An Offline-First AI Nature Companion

> What if AI helped us spend less time online and more time exploring the world?

WILDR is an open-source project concept for an AI-powered nature companion that encourages people to step outside, discover their surroundings, and document what they observe.

Instead of creating another app designed to keep users scrolling, WILDR aims to use technology as a bridge between digital tools and real-world exploration.

**Project status:** Early development / implementation in progress.

## 🌱 The Problem

Technology makes information accessible, but many digital experiences encourage us to remain on our screens. At the same time, exploring nature can feel intimidating when we don't know what to look for or how to learn from what we see.

WILDR explores a different approach: use AI to support curiosity, then put the phone away and explore.

## ✨ Planned Features

### 🥾 Outdoor Discovery Missions
- Short, guided activities for walks, parks, gardens, and outdoor spaces.
- Missions involving leaves, insects, habitats, weather, patterns, and observation.
- Progress tracking without requiring GPS or an internet connection.

### 📷 Local AI Image Identification
- Select or capture a photograph.
- Run a compatible image-classification model locally in the browser.
- Display ranked candidate labels with appropriate uncertainty guidance.
- Save identification results alongside observations.

Identification results will be suggestions, not definitive species identification. The initial model's supported categories and limitations will be documented.

### 📓 Offline Field Journal
- Create, edit, view, and delete observations.
- Record notes and connect observations to completed missions.
- Store data locally on the device.
- Revisit discoveries without creating an account.

### 📡 Offline-Friendly Web App
- Installable Progressive Web App (PWA).
- Cached application resources and mission content.
- Local model assets for offline inference after setup.
- Clear status and recovery messages if required assets are missing.

## 🧠 Technology Stack

The planned stack includes:

| Component | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling | CSS Modules or component-scoped CSS |
| Browser AI | ONNX Runtime Web |
| Inference backend | WebAssembly (WASM) |
| Candidate model | MobileNetV3-Small, subject to license verification |
| Local persistence | IndexedDB |
| Offline capabilities | PWA manifest and service worker |
| Testing | Vitest, React Testing Library, Playwright |
| Continuous integration | GitHub Actions |

The final model and its associated weights will be selected only after verifying applicable licensing, redistribution terms, model provenance, and compatibility with browser inference.

## 🏗️ Architecture

The intended architecture keeps the core experience on the user's device.

```text
                  WILDR PWA
                      |
          +-----------+-----------+
          |           |           |
       Missions    Identify     Journal
          |           |           |
          |      Local ONNX       |
          |      Inference        |
          |           |           |
          +-----------+-----------+
                      |
                IndexedDB
             Local user data
                      |
              Service Worker
          Cached app and assets
```

No hosted AI inference service is required by the intended core workflow. The app must download any necessary model assets before it can perform offline inference for the first time.

## 🗺️ Development Roadmap

The project is organized into six milestones:

- [ ] **Milestone 1:** Project foundation, responsive UI, and CI
- [ ] **Milestone 2:** Outdoor missions and persistent field journal
- [ ] **Milestone 3:** Real local image inference and model evaluation
- [ ] **Milestone 4:** Installable PWA and verified offline operation
- [ ] **Milestone 5:** End-to-end integration and accessibility
- [ ] **Milestone 6:** Testing, documentation, licensing audit, and release

A milestone should be marked complete only after its implementation and acceptance tests have been verified.

## 🚀 Getting Started

Once the application implementation is available in this repository, use the following commands from the project root:

```bash
npm install
npm run dev
```

To run the quality checks and create a production build, use the scripts provided by the repository:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

The exact scripts and prerequisites will be documented alongside the implementation. Offline inference requires successful setup and download of the selected model assets.

## 🧪 Testing and Quality Standards

WILDR aims to verify its important promises through automated tests and real browser checks.

Planned acceptance criteria include:

- At least 20 complete, validated outdoor missions.
- Mission progress and journal records persist across reloads.
- Real model inference produces outputs from the selected model.
- AI evaluation reports measured top-1 and top-5 accuracy where applicable.
- The application can reopen offline after setup.
- Local inference does not upload images to a server.
- Core mission, identification, and journal workflows work without internet access after setup.
- A clean checkout builds and passes the project's CI checks.

Performance measurements and model accuracy will be reported only after they have actually been measured.

## 🔐 Privacy and Safety

WILDR is designed around local-first data handling.

- No account is required for the core experience.
- Journal entries should remain on the device by default.
- Image inference should run locally.
- No GPS or microphone permission is required for the initial mission and image-identification workflows.
- Users should never rely on an AI prediction to determine whether a plant is edible or safe.
- Users should not touch unknown plants, disturb nests, or approach wildlife to complete a mission.

Browser storage can be removed by users or evicted by the browser. Offline availability therefore depends on successful asset setup and available local storage.

## 📜 Licensing

The application code license and the licenses for model weights, datasets, images, and third-party dependencies must be evaluated separately.

The project will document its chosen code license, model provenance, applicable weight terms, and third-party notices before publishing a distributable release.

Do not assume that the model's implementation license automatically covers its pretrained weights or training data.

## 🤝 Contributing

Contributions will be welcome in areas such as:

- New outdoor missions
- Accessibility improvements
- Browser compatibility testing
- Offline reliability
- Model evaluation and optimization
- Documentation and educational content
- Nature-specific classification models with verifiable licensing

Please open an issue to discuss substantial changes before submitting a pull request. Contribution and security-reporting guidance will be maintained in `CONTRIBUTING.md` and `SECURITY.md`.

## 🌍 The Vision

WILDR isn't trying to replace outdoor exploration with an AI experience. It aims to make exploration more approachable, encourage observation, and help people learn from the world around them.

**Use technology to discover something. Then look up and experience it.**

## 🔗 Project Links

- **GitHub:** [Add repository URL]
- **Live demo:** [Add deployed URL when available]
- **Demo video:** [Add video URL when available]
- **Challenge:** [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)
