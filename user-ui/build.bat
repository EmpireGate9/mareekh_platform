
@echo off
setlocal
call npm install
call npm run build
echo Build finished. Artifacts in .\dist
