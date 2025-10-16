
#!/usr/bin/env bash
set -e
npm install
npm run build
echo "Build finished. Artifacts in ./dist"
