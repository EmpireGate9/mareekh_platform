#!/usr/bin/env bash
set -euo pipefail
echo "Scanning for .env files..."
git ls-files -co --exclude-standard | grep -i '\.env$' || true
echo "Ensure real secrets are not committed. Keep only .env.example in git."
