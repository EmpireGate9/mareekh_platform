#!/usr/bin/env bash
set -euo pipefail

# Configure
PROJECT="${PROJECT:-YOUR_GCP_PROJECT}"
REGION="${REGION:-YOUR_GCP_REGION}"
REPO="${REPO:-mareekh}"
IMAGE_BACKEND="backend-stub"
IMAGE_ADMIN="admin-ui"
IMAGE_USER="user-ui"

# Artifact Registry repo (Docker) must exist:
# gcloud artifacts repositories create "$REPO" --repository-format=docker --location="$REGION" --description="Mareekh images"
REG="${REGION}-docker.pkg.dev/${PROJECT}/${REPO}"

echo "Building backend stub..."
docker build -t "${REG}/${IMAGE_BACKEND}:stg" backend_stub
docker push "${REG}/${IMAGE_BACKEND}:stg"

# For UI images, build from your real UI folders (replace PATHs):
# docker build -t "${REG}/${IMAGE_ADMIN}:stg" /path/to/admin-ui
# docker build -t "${REG}/${IMAGE_USER}:stg"  /path/to/user-ui
# docker push "${REG}/${IMAGE_ADMIN}:stg"
# docker push "${REG}/${IMAGE_USER}:stg"

echo "Done. Images pushed to ${REG}"
