#!/bin/bash

# BiBest Learning Center — skrypt uruchamiający
# Uzycie:  ./start.sh
# Stop:    Ctrl+C

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   BiBest Learning Center${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Sprawdz Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}BLAD: Node.js nie jest zainstalowany!${NC}"
    echo "Pobierz z: https://nodejs.org/ (wersja 18+)"
    exit 1
fi
echo -e "${GREEN}Node.js: $(node -v)${NC}"

# Instalacja backendu
if [ ! -d "$ROOT_DIR/backend/node_modules" ]; then
    echo -e "${YELLOW}Instalacja zaleznosci backendu...${NC}"
    npm install --prefix "$ROOT_DIR/backend"
fi
echo -e "${GREEN}Backend: zaleznosci OK${NC}"

# Instalacja frontendu
if [ ! -d "$ROOT_DIR/client/node_modules" ]; then
    echo -e "${YELLOW}Instalacja zaleznosci frontendu (moze trwac 2-3 min)...${NC}"
    npm install --prefix "$ROOT_DIR/client"
fi
echo -e "${GREEN}Frontend: zaleznosci OK${NC}"

# Zwolnij porty
echo -e "${YELLOW}Zwalnianie portow 3002 i 3003...${NC}"
lsof -ti :3002 | xargs kill -9 2>/dev/null
lsof -ti :3003 | xargs kill -9 2>/dev/null
sleep 1

# Uruchom backend
echo -e "${YELLOW}Uruchamianie API (port 3002)...${NC}"
node "$ROOT_DIR/backend/server.js" &
BACKEND_PID=$!
sleep 2

if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}BLAD: Backend nie uruchomil sie!${NC}"
    exit 1
fi
echo -e "${GREEN}API uruchomione (PID: $BACKEND_PID)${NC}"

# Uruchom frontend
echo -e "${YELLOW}Uruchamianie interfejsu (port 3003)...${NC}"
cd "$ROOT_DIR/client" && PORT=3003 BROWSER=none npm start &
FRONTEND_PID=$!

sleep 5
echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}Portal dziala!${NC}"
echo ""
echo -e "  Otworz w przegladarce:  ${GREEN}http://localhost:3003${NC}"
echo ""
echo -e "${YELLOW}Konta testowe:${NC}"
echo -e "  admin@test.com   / admin"
echo -e "  trainer@test.com / trainer"
echo -e "  user@test.com    / user"
echo ""
echo -e "${YELLOW}Zatrzymanie: Ctrl+C${NC}"
echo -e "${BLUE}================================================${NC}"

# Cleanup przy Ctrl+C
cleanup() {
    echo ""
    echo -e "${YELLOW}Zatrzymuje portal...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    lsof -ti :3002 | xargs kill -9 2>/dev/null
    lsof -ti :3003 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}Zatrzymano.${NC}"
    exit 0
}
trap cleanup SIGINT SIGTERM

wait
