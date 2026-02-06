# Invoice Template Automation - React + TypeScript + Vite UI

**A modern web-based invoice template automation system with React frontend and Python backend**

> 🎉 **UI Migration Complete**: Successfully converted from Streamlit to React + TypeScript + Vite + Tailwind CSS

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- pip

### Step 1: Backend Setup
```bash
cd invoice_automation
pip install -r requirements.txt
python api.py
```
Backend runs on http://localhost:8000

### Step 2: Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

### Step 3: Open Browser
Navigate to **http://localhost:5173** ✨

## 📋 What You Get

### Frontend Features ✅
- **Modern React UI** with TypeScript
- **Real-time Calculations**: Budget, VAT, Total
- **Date Picker**: Visual calendar widget
- **Month Picker**: Month/Year selection
- **Client Management**: Dropdown with add functionality
- **Form Validation**: All inputs validated
- **Responsive Design**: Works on desktop, tablet, mobile
- **Professional Styling**: Tailwind CSS

### Backend Features ✅
- **REST API**: Flask-based API server
- **Excel Integration**: Automated template manipulation
- **Client Database**: Persistent client management
- **Invoice Generation**: Excel file output
- **PDF Support**: BO document parsing
- **Validation**: Comprehensive input validation

## 📁 Project Structure

```
InvoiceTemplatation/
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── services/api.ts     # API client
│   │   ├── App.tsx             # Main app
│   │   └── index.css           # Tailwind styles
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
├── invoice_automation/          # Python backend
│   ├── api.py                  # Flask REST API
│   ├── ui.py                   # Original Streamlit (still available)
│   ├── excel_handler.py
│   ├── client_manager.py
│   ├── validator.py
│   ├── config.py
│   └── requirements.txt
│
├── docker-compose.yml          # Multi-container setup
├── MIGRATION_GUIDE.md          # Detailed migration info
└── REACT_SETUP.md              # Frontend setup guide
```

## 🎯 Key Features

### Invoice Editor Form
- **Invoice Number**: Auto-generated with prefix
- **Client Selection**: Dropdown with auto-populate
- **Date Selection**: Calendar picker widget
- **Business Order**: BO number field
- **Delivery Month**: Month/year picker
- **Description**: Large text area
- **Quantity & Rate**: Numeric inputs
- **Budget**: Auto-calculated (Qty × Rate ÷ 1000)
- **VAT Rate**: GCC (5%) or Non-GCC (0%)
- **Total Amount**: Auto-calculated (Budget + VAT)

### Client Management
- Existing clients dropdown
- Auto-populate address from client
- Add new clients in-app
- Persistent client database

### Calculations
Real-time auto-calculations for:
- Budget: `(Quantity × Rate) / 1000`
- VAT Amount: `Budget × VAT% / 100`
- Total Amount: `Budget + VAT Amount`

### Summary Metrics
Display of:
- Budget (formatted with thousands separator)
- VAT Type (GCC or Non-GCC)
- VAT Amount
- Total Amount with delta

## 🛠 Development

### Frontend Development
```bash
cd frontend
npm run dev              # Start dev server (HMR enabled)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run linter
```

### Backend Development
```bash
cd invoice_automation
python api.py           # Development server with debug mode
```

### Using Docker Compose
```bash
docker-compose up --build   # Build and start all services
docker-compose down         # Stop all services
```

## 🐳 Docker Deployment

### Single Command Deployment
```bash
docker-compose up --build

# Access:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# Streamlit (optional): http://localhost:8501
```

### Individual Docker Images

**Backend API:**
```bash
docker build -f Dockerfile.api -t invoice-api .
docker run -p 8000:8000 -v $(pwd)/invoice_automation/generated_invoices:/app/generated_invoices invoice-api
```

**Frontend:**
```bash
docker build -f Dockerfile.frontend -t invoice-frontend .
docker run -p 5173:5173 invoice-frontend
```

**Production Build:**
```bash
docker build -f Dockerfile.multistage -t invoice-app .
docker run -p 8000:8000 -p 80:5173 invoice-app
```

## 📚 API Endpoints

All endpoints available at `http://localhost:8000/api/`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/invoice/initial` | Get template data |
| GET | `/clients` | List all clients |
| POST | `/clients/add` | Add new client |
| GET | `/invoice/next-number` | Get next invoice number |
| POST | `/invoice/validate` | Validate invoice data |
| POST | `/invoice/save` | Save invoice to Excel |
| GET | `/health` | Health check |

## 🎨 Styling

Uses **Tailwind CSS** with custom configurations:

```typescript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
      }
    },
  }
}
```

### Common CSS Classes

```css
.field-group    /* Form field container */
.form-section   /* Form section container */
.metric-card    /* Metric display card */
.error-message  /* Error styling */
.success-message /* Success styling */
.info-message   /* Info styling */
```

## 🔧 Configuration

### Frontend Environment
Create `.env.local` in `frontend/`:
```env
REACT_APP_API_URL=http://localhost:8000
```

### Backend Configuration
Edit `invoice_automation/config.py`:
- Template file path
- Output folder
- Validation rules
- Field mappings

## 📱 Responsive Design

The UI is fully responsive:
- **Desktop** (1024px+): 2-column layout with sidebar
- **Tablet** (768px-1023px): Adjusted spacing
- **Mobile** (320px-767px): Single column, stacked layout

## 🧪 Testing

### Frontend (Optional)
```bash
cd frontend
npm install --save-dev @testing-library/react vitest
npm run test
```

### Backend API
```bash
# Manual testing with curl
curl http://localhost:8000/health

# Using Python requests
python -c "import requests; print(requests.get('http://localhost:8000/health').json())"
```

## 🔄 Migration from Streamlit

The original Streamlit UI is fully preserved. Choose your interface:

**React Frontend** (Recommended):
```bash
npm run dev --prefix frontend
```

**Streamlit** (Legacy):
```bash
streamlit run invoice_automation/ui.py
```

Both interfaces work with the same backend and data.

## 🚨 Troubleshooting

### Frontend won't connect to backend
```bash
# Check backend is running
curl http://localhost:8000/health

# Clear frontend cache
rm -rf frontend/node_modules
npm install --prefix frontend
```

### Port conflicts
Change ports in:
- Frontend: `vite.config.ts` (server.port)
- Backend: `api.py` (app.run port)

### Build issues
```bash
# Frontend
npm cache clean --force
npm install --prefix frontend
npm run build --prefix frontend

# Backend
pip install --upgrade -r invoice_automation/requirements.txt
```

## 📦 Dependencies

### Frontend
- React 18.2.0
- TypeScript 5.2.2
- Vite 5.0.8
- Tailwind CSS 3.3.6
- Axios 1.6.0

### Backend
- Flask 3.0.0
- Flask-CORS 4.0.0
- openpyxl 3.1.5
- pandas 2.0.3
- PyPDF2 4.0.1

## 🔐 Security

- ✅ Input validation on all fields
- ✅ File size restrictions for uploads
- ✅ CORS enabled for localhost (configure for production)
- ✅ No sensitive data in logs

For production deployment:
```python
# api.py - update CORS
CORS(app, origins=['your-domain.com'])
```

## 📚 Documentation

- [Frontend README](frontend/README.md) - Detailed React setup
- [Migration Guide](MIGRATION_GUIDE.md) - Complete migration details
- [React Setup](REACT_SETUP.md) - React-specific setup

## 🎓 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Backend API | Flask + Flask-CORS |
| Template Engine | openpyxl + pandas |
| PDF Processing | PyPDF2 |

## 📈 Performance

- ⚡ Instant HMR (Hot Module Reload) in development
- 📦 Code splitting with Vite
- 🎯 Tree-shaking of unused code
- 📉 Optimized Tailwind CSS bundle
- ⏱️ Fast backend API responses

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

Same as original project

## 📞 Support

For issues or questions:
1. Check [Troubleshooting](#-troubleshooting) section
2. Review documentation in [docs/](.)
3. Check backend logs: `python api.py --debug`

## 🎉 What's Different from Streamlit

| Feature | Streamlit | React |
|---------|-----------|-------|
| Build Speed | Slow | ⚡ Very Fast (Vite) |
| HMR | No | ✅ Yes |
| Customization | Limited | ✅ Full Control |
| Performance | Moderate | ✅ Excellent |
| Bundle Size | Large | ✅ Small |
| Offline Support | No | ✅ Possible |
| API Calls | Direct | ✅ Centralized |
| State Management | Built-in | ✅ Flexible |

---

**Ready to get started?** Follow the [Quick Start](#-quick-start-5-minutes) section above! 🚀
