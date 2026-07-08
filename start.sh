#!/bin/bash

# BiBest Learning Center — startup script
# Usage:  ./start.sh
# Stop:   Ctrl+C

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

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js is not installed!${NC}"
    echo "Download from: https://nodejs.org/ (version 18+)"
    exit 1
fi
echo -e "${GREEN}Node.js: $(node -v)${NC}"

# Install backend deps
if [ ! -d "$ROOT_DIR/backend/node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install --prefix "$ROOT_DIR/backend"
fi
echo -e "${GREEN}Backend: dependencies OK${NC}"

# Install frontend deps
if [ ! -d "$ROOT_DIR/client/node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies (may take 2-3 min)...${NC}"
    npm install --prefix "$ROOT_DIR/client"
fi
echo -e "${GREEN}Frontend: dependencies OK${NC}"

# Free ports
echo -e "${YELLOW}Freeing ports 3000, 3002 and 3003...${NC}"
lsof -ti :3000 | xargs kill -9 2>/dev/null
lsof -ti :3002 | xargs kill -9 2>/dev/null
lsof -ti :3003 | xargs kill -9 2>/dev/null
sleep 1

# Start backend
echo -e "${YELLOW}Starting API (port 3002)...${NC}"
node "$ROOT_DIR/backend/server.js" &
BACKEND_PID=$!
sleep 2

if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}ERROR: Backend failed to start!${NC}"
    exit 1
fi
echo -e "${GREEN}API running (PID: $BACKEND_PID)${NC}"

# Start frontend
echo -e "${YELLOW}Starting UI (port 3003)...${NC}"
cd "$ROOT_DIR/client" && PORT=3003 BROWSER=none npm start &
FRONTEND_PID=$!

sleep 5
echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}Platform is running!${NC}"
echo ""
echo -e "  Open in browser:  ${GREEN}http://localhost:3003${NC}"
echo ""
echo -e "${YELLOW}Demo accounts:${NC}"
echo -e "  admin@bibest.eu  / admin"
echo -e "  user@bibest.eu   / user"
echo ""
echo -e "${YELLOW}Stop: Ctrl+C${NC}"
echo -e "${BLUE}================================================${NC}"

# Cleanup on Ctrl+C
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping platform...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    lsof -ti :3002 | xargs kill -9 2>/dev/null
    lsof -ti :3003 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}Stopped.${NC}"
    exit 0
}
trap cleanup SIGINT SIGTERM

wait
