#!/bin/bash

# ============================================================
# BiBest Learning Center — Skrypt uruchamiający
# ============================================================
# Użycie: chmod +x start.sh && ./start.sh
# Zatrzymanie: Ctrl+C (zatrzymuje oba procesy)
# ============================================================

set -e

# Kolory do lepszej czytelności
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   BiBest Learning Center — Start${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# ---- Sprawdź czy Node.js jest zainstalowany ----
if ! command -v node &> /dev/null; then
    echo -e "${RED}BŁĄD: Node.js nie jest zainstalowany!${NC}"
    echo "Pobierz z: https://nodejs.org/ (wersja 18 lub nowsza)"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js: $NODE_VERSION${NC}"

# ---- Sprawdź npm ----
if ! command -v npm &> /dev/null; then
    echo -e "${RED}BŁĄD: npm nie jest zainstalowany!${NC}"
    exit 1
fi

# ---- Instalacja zależności backendu (jeśli brak) ----
if [ ! -d "backend/node_modules" ]; then
    echo ""
    echo -e "${YELLOW}→ Instalacja zależności backendu (pierwsze uruchomienie)...${NC}"
    cd backend && npm install && cd ..
    echo -e "${GREEN}✓ Backend: zależności zainstalowane${NC}"
else
    echo -e "${GREEN}✓ Backend: zależności OK${NC}"
fi

# ---- Instalacja zależności frontendu (jeśli brak) ----
if [ ! -d "client/node_modules" ]; then
    echo ""
    echo -e "${YELLOW}→ Instalacja zależności frontendu (pierwsze uruchomienie, może potrwać 2-3 min)...${NC}"
    cd client && npm install && cd ..
    echo -e "${GREEN}✓ Frontend: zależności zainstalowane${NC}"
else
    echo -e "${GREEN}✓ Frontend: zależności OK${NC}"
fi

# ---- Zwolnij porty jeśli zajęte ----
echo ""
echo -e "${YELLOW}→ Sprawdzanie portów 3002 i 3003...${NC}"

if lsof -ti :3002 &> /dev/null; then
    echo -e "${YELLOW}  Port 3002 zajęty — zatrzymuję poprzedni backend...${NC}"
    lsof -ti :3002 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

if lsof -ti :3003 &> /dev/null; then
    echo -e "${YELLOW}  Port 3003 zajęty — zatrzymuję poprzedni frontend...${NC}"
    lsof -ti :3003 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

# ---- Uruchom backend ----
echo ""
echo -e "${YELLOW}→ Uruchamianie serwera API (port 3002)...${NC}"
cd backend && node server.js &
BACKEND_PID=$!
cd ..

# Poczekaj aż backend się uruchomi
sleep 2

if kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${GREEN}✓ Backend uruchomiony (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}BŁĄD: Backend nie uruchomił się!${NC}"
    exit 1
fi

# ---- Uruchom frontend ----
echo ""
echo -e "${YELLOW}→ Uruchamianie interfejsu (port 3003)...${NC}"
echo -e "${YELLOW}  (budowanie może potrwać 15-30 sekund)${NC}"
cd client && PORT=3003 npm start &
FRONTEND_PID=$!
cd ..

# ---- Podsumowanie ----
echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}✓ Portal uruchamia się!${NC}"
echo ""
echo -e "  ${GREEN}Interfejs:${NC}  http://localhost:3003"
echo -e "  ${GREEN}API:${NC}        http://localhost:3002"
echo ""
echo -e "${YELLOW}Konta testowe:${NC}"
echo -e "  admin@test.com   / admin    (Administrator)"
echo -e "  trainer@test.com / trainer  (Trener)"
echo -e "  user@test.com    / user     (Użytkownik)"
echo ""
echo -e "${YELLOW}Przeglądarka otworzy się automatycznie za chwilę...${NC}"
echo -e "${YELLOW}Aby zatrzymać portal: naciśnij Ctrl+C${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# ---- Cleanup przy Ctrl+C ----
cleanup() {
    echo ""
    echo -e "${YELLOW}Zatrzymuję portal...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    # Zabij też procesy na portach (na wszelki wypadek)
    lsof -ti :3002 | xargs kill -9 2>/dev/null || true
    lsof -ti :3003 | xargs kill -9 2>/dev/null || true
    echo -e "${GREEN}Portal zatrzymany.${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# ---- Czekaj na procesy ----
wait $FRONTEND_PID
