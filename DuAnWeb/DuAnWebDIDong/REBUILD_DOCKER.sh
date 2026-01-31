#!/bin/bash

echo "========================================"
echo "  REBUILD DOCKER - Cập nhật file mới"
echo "========================================"
echo ""

echo "[1/3] Dừng container cũ..."
docker-compose down

echo ""
echo "[2/3] Rebuild image với file mới..."
docker-compose up -d --build

echo ""
echo "[3/3] Đợi database import (30 giây)..."
sleep 30

echo ""
echo "========================================"
echo "  HOÀN TẤT! Truy cập:"
echo "  http://localhost:8080"
echo "========================================"
echo ""
