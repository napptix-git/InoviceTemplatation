@echo off
REM Quick Start Commands for Invoice Template Automation (Windows)

cls
echo ===============================================
echo Invoice Template Automation - Quick Start
echo ===============================================
echo.

echo Choose how you want to run the application:
echo.
echo 1) Development Mode (recommended for development)
echo    - Start backend: cd invoice_automation ^&^& python api.py
echo    - Start frontend: cd frontend ^&^& npm install ^&^& npm run dev
echo    - Access: http://localhost:5173
echo.
echo 2) Docker Compose (recommended for quick setup)
echo    - Run: docker-compose up --build
echo    - Access: http://localhost:5173
echo.
echo 3) Original Streamlit UI (legacy)
echo    - Run: cd invoice_automation ^&^& streamlit run ui.py
echo    - Access: http://localhost:8501
echo.
echo 4) Production Build
echo    - Frontend: cd frontend ^&^& npm run build
echo    - Backend: cd invoice_automation ^&^& python api.py
echo    - Access: http://localhost:5173 (serve dist folder)
echo.
echo ===============================================
echo.
echo Detailed documentation:
echo - README_REACT_UI.md       - Main project overview
echo - MIGRATION_GUIDE.md       - Complete migration guide
echo - REACT_SETUP.md           - Frontend setup
echo - COMPARISON.md            - Streamlit vs React comparison
echo - frontend\README.md       - Frontend documentation
echo - CONVERSION_SUMMARY.md    - What was converted
echo.
echo ===============================================
echo.
pause
