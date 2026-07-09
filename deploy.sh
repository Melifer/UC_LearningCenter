#!/bin/bash

# UC Learning Center — build + deploy na FTP
# Użycie: ./deploy.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   UC Learning Center — Deploy${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# --- BUILD ---
echo -e "${YELLOW}📦  Budowanie frontendu (client/dist)...${NC}"
cd "$ROOT_DIR/client" && npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}❌  Build nie powiódł się. Przerywam.${NC}"
  exit 1
fi

echo -e "${GREEN}✅  Build gotowy.${NC}"
echo ""

# --- DEPLOY ---
echo -e "${YELLOW}🚀  Wysyłanie na FTP...${NC}"
cd "$ROOT_DIR" && zsh -i -c "node scripts/deploy-ftp.js"

if [ $? -ne 0 ]; then
  echo -e "${RED}❌  Deploy nie powiódł się.${NC}"
  exit 1
fi

echo -e "${GREEN}✅  Wszystko gotowe!${NC}"
echo ""
