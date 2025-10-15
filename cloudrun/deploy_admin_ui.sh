#!/usr/bin/env bash
set -euo pipefail
PROJECT="${PROJECT:-YOUR_GCP_PROJECT}"
REGION="${REGION:-YOUR_GCP_REGION}"
REPO="${REPO:-mareekh}"
REG="${REGION}-docker.pkg.dev/${PROJECT}/${REPO}"
SERVICE="mareekh-admin-ui-stg"

# Replace --image with your built admin UI image
gcloud run deploy "$SERVICE"   --image="${REG}/admin-ui:stg"   --platform=managed   --region="${REGION}"   --allow-unauthenticated   --max-instances=2   --set-env-vars=VITE_API_BASE=$(gcloud run services describe mareekh-backend-stub-stg --region=$REGION --format='value(status.url)')
