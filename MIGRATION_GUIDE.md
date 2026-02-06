# React Frontend Conversion - Setup & Deployment Guide

## Overview

The Invoice Template Automation system has been converted from Streamlit to a modern **React + TypeScript + Vite + Tailwind CSS** frontend while maintaining all backend functionality.

### What's New

✅ **Modern Stack**: React 18 + TypeScript + Vite for fast development
✅ **Responsive Design**: Works great on desktop, tablet, and mobile
✅ **Tailwind CSS**: Clean, professional styling matching original Streamlit UI
✅ **Component Architecture**: Reusable, maintainable components
✅ **Flask API Backend**: REST API wrapper for all backend operations
✅ **Docker Support**: Easy deployment with Docker Compose

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   React Frontend (Port 5173)                 │
│              TypeScript + Vite + Tailwind CSS               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    (Axios HTTP Calls)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│              Flask API Backend (Port 8000)                   │
│              REST Endpoints for All Operations              │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│         Python Backend (invoice_automation/)                 │
│    - ExcelHandler: Template manipulation                     │
│    - ClientManager: Client data management                   │
│    - Validator: Invoice validation                          │
│    - PDF Parser: BO document parsing                        │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start (Development)

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- pip package manager

### 1. Backend Setup

```bash
# Navigate to backend directory
cd invoice_automation

# Install Python dependencies
pip install -r requirements.txt

# Start Flask API server
python api.py
# Backend will run on http://localhost:8000
```

### 2. Frontend Setup

In a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start development server
npm run dev
# Frontend will run on http://localhost:5173
```

### 3. Access the Application

Open your browser and navigate to:
- **Frontend UI**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: Check `invoice_automation/api.py` for available endpoints

## Project Structure

```
InvoiceTemplatation/
├── frontend/                          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── InvoiceForm.tsx      # Main form component
│   │   │   ├── SummarySection.tsx   # Summary metrics
│   │   │   ├── ClientDropdown.tsx   # Client selector
│   │   │   ├── DatePicker.tsx       # Date selection widget
│   │   │   ├── MonthPicker.tsx      # Month selection widget
│   │   │   └── Form inputs...       # Input components
│   │   ├── services/
│   │   │   └── api.ts               # API client
│   │   ├── App.tsx                  # Main app component
│   │   ├── index.css                # Global styles
│   │   └── main.tsx                 # Entry point
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── vite.config.ts               # Vite configuration
│   ├── tsconfig.json                # TypeScript config
│   ├── package.json                 # Dependencies
│   └── README.md                    # Frontend-specific docs
│
├── invoice_automation/               # Python backend
│   ├── api.py                       # Flask REST API
│   ├── ui.py                        # Original Streamlit UI (kept for reference)
│   ├── excel_handler.py             # Excel template handler
│   ├── client_manager.py            # Client data management
│   ├── validator.py                 # Invoice validation
│   ├── config.py                    # Configuration
│   ├── requirements.txt             # Python dependencies
│   └── generated_invoices/          # Output directory
│
├── docker-compose.yml               # Multi-container setup
├── Dockerfile                       # Streamlit container (legacy)
├── Dockerfile.api                   # Backend API container
├── Dockerfile.frontend              # Frontend container
├── Dockerfile.multistage           # Combined production build
└── REACT_SETUP.md                  # Frontend setup guide
```

## Features (All Preserved)

### ✅ Form Fields
- Invoice Number (auto-generated with prefix)
- Client Name (dropdown with auto-populate)
- Client Address (auto-populated from client)
- Client TRN No.
- Date (with calendar picker)
- Due Date (calculated: Date + 30 days)
- BO No. (Business Order)
- Delivery Month (with month/year picker)
- Description
- Quantity (numeric)
- Rate (numeric)
- Budget (calculated from Quantity × Rate ÷ 1000)
- VAT Rate (GCC 5% or Non-GCC 0%)
- Total Amount (calculated: Budget + VAT)

### ✅ Client Management
- Dropdown list of existing clients
- Auto-populate address when client selected
- "Add Client" button for new clients
- Persistent client database

### ✅ Calculations
- Real-time budget calculation
- VAT amount based on selected rate
- Total amount calculation
- All displayed in summary section

### ✅ Date/Time Selection
- Calendar picker for invoice date
- Month/year picker for delivery month
- Both with visual selectors

### ✅ Actions
- Save Invoice (with validation)
- Clear Fields (with confirmation)
- Validation of all required fields

### ✅ Summary Metrics
- Budget display
- VAT Type
- VAT Amount
- Total Amount with delta indicator

## Development

### Building Components

Components are located in `frontend/src/components/`. They're designed to be reusable and properly typed with TypeScript.

Example component:
```typescript
import React from 'react';

interface MyComponentProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function MyComponent({ label, value, onChange }: MyComponentProps) {
  return (
    <div className="field-group">
      <label className="font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
```

### Styling with Tailwind

The project uses Tailwind CSS for styling. Common CSS classes are pre-defined in `src/index.css`:

```css
.field-group { ... }           /* Field container */
.form-section { ... }           /* Form section container */
.metric-card { ... }            /* Metric display card */
.error-message { ... }          /* Error styling */
.success-message { ... }        /* Success styling */
```

### API Integration

The `services/api.ts` file contains all API calls:

```typescript
import { apiClient } from './services/api';

// Example usage in components
const clients = await apiClient.getClients();
const result = await apiClient.saveInvoice(data);
```

## Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Services will be available at:
# - Frontend: http://localhost:5173
# - Backend API: http://localhost:8000
# - Streamlit (optional): http://localhost:8501
```

### Option 2: Production Build

#### Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/

# Serve with nginx or similar:
# - Copy dist/ contents to /var/www/html
# - Configure reverse proxy to backend API
```

#### Backend
```bash
cd invoice_automation

# Using gunicorn (production-ready)
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 api:app

# Or use the Docker container:
docker build -f Dockerfile.api -t invoice-api .
docker run -p 8000:8000 -v $(pwd)/invoice_automation/generated_invoices:/app/generated_invoices invoice-api
```

### Option 3: Manual Deployment

#### Frontend (using Nginx)
1. Build React app: `npm run build`
2. Copy `dist/` contents to Nginx `/var/www/html`
3. Configure Nginx to proxy API calls to backend

#### Backend (using systemd service)
Create `/etc/systemd/system/invoice-api.service`:
```ini
[Unit]
Description=Invoice Template API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/app/invoice_automation
ExecStart=/usr/bin/python3 /home/app/invoice_automation/api.py
Restart=always

[Install]
WantedBy=multi-user.target
```

## Environment Variables

### Frontend (.env.local)
```env
REACT_APP_API_URL=http://localhost:8000
```

### Backend (api.py)
Configure Flask app settings as needed in `api.py`

## Troubleshooting

### Frontend doesn't connect to backend
1. Ensure backend is running: `curl http://localhost:8000/health`
2. Check `REACT_APP_API_URL` environment variable
3. Verify CORS is enabled in Flask (it is in provided `api.py`)

### Port conflicts
- Frontend (5173): Change in `vite.config.ts`
- Backend (8000): Change in `api.py`

### Dependencies issues
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
pip install --upgrade -r requirements.txt
```

### Build errors
```bash
# Frontend
npm cache clean --force
npm install
npm run build

# Backend
python api.py --debug
```

## Performance Optimization

### Frontend
- Vite provides instant HMR (Hot Module Replacement)
- Build is optimized with code splitting
- Tailwind purges unused CSS in production

### Backend
- Implement caching for template data
- Use connection pooling for Excel operations
- Consider request queuing for large operations

## Security Notes

1. **CORS**: Currently allows all origins (development). For production:
   ```python
   CORS(app, origins=['yourdomain.com'])
   ```

2. **Validation**: All input is validated before processing

3. **File Uploads**: Implement file size limits and validation

## Testing

### Frontend Unit Tests (Optional)
```bash
npm install --save-dev @testing-library/react vitest
npm run test
```

### Backend API Testing
```bash
# Using curl
curl http://localhost:8000/health

# Using Python requests
python -m pytest invoice_automation/tests/
```

## Migration from Streamlit

The original Streamlit UI (`ui.py`) is still available and unchanged. To use it:

```bash
streamlit run invoice_automation/ui.py
```

The React frontend is the recommended modern interface with identical functionality.

## Support & Maintenance

### Common Tasks

**Add new field to invoice:**
1. Update `INVOICE_FIELDS` in `config.py`
2. Create new component in `frontend/src/components/`
3. Add to `InvoiceForm.tsx`
4. Update API validation in `api.py`

**Update styling:**
1. Modify `tailwind.config.js` for theme
2. Update component classes
3. Or add custom CSS in `src/index.css`

**Add new API endpoint:**
1. Add route in `invoice_automation/api.py`
2. Add client method in `frontend/src/services/api.ts`
3. Use in component via `apiClient.methodName()`

## License

Same as original project

## Version Info

- React: 18.2.0
- TypeScript: 5.2.2
- Vite: 5.0.8
- Tailwind CSS: 3.3.6
- Flask: 3.0.0
- Python: 3.8+
- Node: 16+

---

For detailed component documentation, see [frontend/README.md](frontend/README.md)
For backend API documentation, see code comments in `invoice_automation/api.py`
