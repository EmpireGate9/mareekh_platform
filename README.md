# Mareekh Ops Pack v1 — Staging & Production Prep

This pack fills the missing pieces to deploy **admin-ui / user-ui** to **Render** or **Cloud Run**,
and provides a **minimal FastAPI backend stub** so UIs have a live `/healthz` and `/version` until
the real API is wired.

## Contents
- `env/.env.example` — central env template (copy to platform env vars; never commit real secrets).
- `compose/docker-compose.yml` — local dev compose (UI + backend stub).
- `render/render.yaml` — example Render blueprint for admin UI, user UI, and backend stub (Docker services).
- `cloudrun/*.sh` — scripts to build, push, and deploy each service to Cloud Run.
- `backend_stub/` — minimal FastAPI app with `/healthz`, `/version`, and `/echo`.
- `scripts/sanitize_envs.sh` — ensures no real secrets get committed.

## Quick Start (local)
```bash
cp env/.env.example .env
docker compose -f compose/docker-compose.yml up --build
# Admin UI at http://localhost:5173 (if your UI Dockerfile runs dev) or http://localhost:8081 for static
# User  UI at http://localhost:5174 (or http://localhost:8082)
# Backend stub at http://localhost:8000/healthz
```

## Cloud Run (staging example)
1. Authenticate and set project/region:
```bash
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT
gcloud config set run/region YOUR_GCP_REGION
```
2. Build & push:
```bash
bash cloudrun/build_and_push.sh
```
3. Deploy:
```bash
bash cloudrun/deploy_backend_stub.sh
bash cloudrun/deploy_admin_ui.sh
bash cloudrun/deploy_user_ui.sh
```

## Render (staging example)
Point your Render Docker services to the correct subfolders in your original repo (admin/user UI Dockerfiles),
or use this pack's `render.yaml` as a reference. Inject env vars from `env/.env.example` at service settings.

## Notes
- Replace placeholder values (e.g. `YOUR_GCP_PROJECT`, `YOUR_REGISTRY`) before running.
- Wire the real API base URL into your UIs via env (`VITE_API_BASE`).
- Once real backend is ready, remove `backend_stub` or keep as a health/service page.
