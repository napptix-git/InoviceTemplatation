#!/bin/bash
# Quick Start Commands for Invoice Template Automation

echo "==============================================="
echo "Invoice Template Automation - Quick Start"
echo "==============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Choose how you want to run the application:${NC}"
echo ""
echo "1) ${GREEN}Development Mode${NC} (recommended for development)"
echo "   - Start backend: cd invoice_automation && python api.py"
echo "   - Start frontend: cd frontend && npm install && npm run dev"
echo "   - Access: http://localhost:5173"
echo ""
echo "2) ${GREEN}Docker Compose${NC} (recommended for quick setup)"
echo "   - Run: docker-compose up --build"
echo "   - Access: http://localhost:5173"
echo ""
echo "3) ${GREEN}Original Streamlit UI${NC} (legacy)"
echo "   - Run: cd invoice_automation && streamlit run ui.py"
echo "   - Access: http://localhost:8501"
echo ""
echo "4) ${GREEN}Production Build${NC}"
echo "   - Frontend: cd frontend && npm run build"
echo "   - Backend: cd invoice_automation && python api.py"
echo "   - Access: http://localhost:5173 (serve dist folder)"
echo ""
echo "==============================================="
echo ""
echo -e "${BLUE}Detailed documentation:${NC}"
echo "- README_REACT_UI.md       - Main project overview"
echo "- MIGRATION_GUIDE.md       - Complete migration guide"
echo "- REACT_SETUP.md           - Frontend setup"
echo "- COMPARISON.md            - Streamlit vs React comparison"
echo "- frontend/README.md       - Frontend documentation"
echo "- CONVERSION_SUMMARY.md    - What was converted"
echo ""
echo "==============================================="
