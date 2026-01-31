@echo off
echo ========================================
echo   REBUILD DOCKER - Cap nhat file moi
echo ========================================
echo.

echo [1/3] Dung container cu...
docker-compose down

echo.
echo [2/3] Rebuild image voi file moi...
docker-compose up -d --build

echo.
echo [3/3] Doi database import (30 giay)...
timeout /t 30 /nobreak

echo.
echo ========================================
echo   HOAN TAT! Truy cap:
echo   http://localhost:8080
echo ========================================
echo.
pause
