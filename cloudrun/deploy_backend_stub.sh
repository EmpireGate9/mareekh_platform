#!/usr/bin/env bash
set -euo pipefail
PROJECT="${PROJECT:-YOUR_GCP_PROJECT}"
REGION="${REGION:-YOUR_GCP_REGION}"
REPO="${REPO:-mareekh}"
REG="${REGION}-docker.pkg.dev/${PROJECT}/${REPO}"
SERVICE="mareekh-backend-stub-stg"

gcloud run deploy "$SERVICE"   --image="${REG}/backend-stub:stg"   --platform=managed   --region="${REGION}"   --allow-unauthenticated   --max-instances=2   --set-env-vars=APP_NAME=mareekh-backend-stub,APP_ENV=staging,LOG_LEVEL=INFO
