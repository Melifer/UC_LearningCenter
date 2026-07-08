#!/bin/bash
# BiBest Learning Center — production deploy build
# Output: bibest-learning-center.zip  (ready to upload via FTP to Cyberfolks)

set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "================================================"
echo "   BiBest Learning Center — Build Deploy"
echo "================================================"
echo ""

# ── 1. Frontend build ────────────────────────────────
echo -e "${YELLOW}[1/3] Building React frontend...${NC}"
cd "$ROOT/client"
npm run build
echo -e "${GREEN}✓ Frontend built → client/dist/${NC}"

# ── 2. Assemble deploy package ───────────────────────
echo -e "${YELLOW}[2/3] Assembling deploy package...${NC}"
cd "$ROOT"
rm -rf _deploy

mkdir -p _deploy
mkdir -p _deploy/client/dist
mkdir -p _deploy/client/public/images

# Backend
cp backend/server.js     _deploy/server.js
cp backend/package.json  _deploy/package.json
cp -r backend/utils      _deploy/utils
cp -r backend/fonts      _deploy/fonts    # DejaVu fonts for Polish PDF certs

# Frontend build
cp -r client/dist/.      _deploy/client/dist/

# Logo (needed by Express static at /images/ and by PDF generator)
cp client/public/images/BiBestLearningCenter.png \
   _deploy/client/public/images/BiBestLearningCenter.png

# Course content
cp -r docs               _deploy/docs

echo -e "${GREEN}✓ Package assembled${NC}"

# ── 3. Zip ───────────────────────────────────────────
echo -e "${YELLOW}[3/3] Creating zip...${NC}"
cd "$ROOT/_deploy"
zip -r "$ROOT/bibest-learning-center.zip" . \
  --exclude "*.DS_Store" \
  --exclude "__MACOSX/*" \
  --exclude "*.log"

cd "$ROOT"
rm -rf _deploy

SIZE=$(du -sh bibest-learning-center.zip | cut -f1)
echo -e "${GREEN}✓ bibest-learning-center.zip  (${SIZE})${NC}"

echo ""
echo "================================================"
echo -e "${GREEN}Done! Deploy checklist:${NC}"
echo ""
echo "  1. Upload bibest-learning-center.zip via FTP"
echo "     to: domains/bibest.eu/learning/"
echo "  2. Extract there (overwrite existing files)"
echo "  3. DA → Node.js → Run NPM Install"
echo "  4. DA → Node.js → Restart"
echo ""
echo "  ENV variable required in DA:"
echo "    NODE_OPTIONS = --experimental-sqlite"
echo ""
echo "  If placeholder still shows:"
echo "    Delete public_html/learning/index.html via FTP"
echo "================================================"
echo ""
