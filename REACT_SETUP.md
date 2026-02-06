# Frontend (React + TypeScript + Vite + Tailwind CSS)

## Quick Start

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Backend Setup

The React frontend requires the Python Flask API to be running:

```bash
cd invoice_automation
pip install -r requirements.txt
python api.py
```

The backend will run on `http://localhost:8000`

## Project Structure

The new frontend includes:

- **src/components/** - Reusable React components
  - `InvoiceForm.tsx` - Main invoice editor form
  - `SummarySection.tsx` - Financial summary metrics
  - `DatePicker.tsx` / `MonthPicker.tsx` - Date selection widgets
  - `ClientDropdown.tsx` - Client selection with add functionality
  - Form input components (TextInput, TextArea, Select)

- **src/services/api.ts** - API client for backend communication

- **Tailwind CSS** - Modern, utility-first styling matching the Streamlit UI design

## Key Features Preserved

✅ Invoice field editor with all fields from the original Streamlit UI
✅ Client dropdown with auto-populated address
✅ Date and month picker widgets
✅ Real-time budget, VAT, and total calculations
✅ Save invoice functionality with validation
✅ Summary metrics display (Budget, VAT Type, VAT Amount, Total)
✅ Clear fields button
✅ Responsive design
✅ Professional modern UI

## API Endpoints

All API endpoints are available at `http://localhost:8000/api/`:

- `GET /invoice/initial` - Get template initial data
- `GET /clients` - List all clients
- `POST /clients/add` - Add new client
- `POST /invoice/save` - Save invoice
- `POST /invoice/validate` - Validate invoice data
- `GET /invoice/next-number` - Get next invoice number

## Building for Production

```bash
cd frontend
npm run build
```

Output files will be in `frontend/dist/`

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

This is optional - the default is `http://localhost:8000`

## Troubleshooting

If you encounter issues:

1. Make sure both frontend and backend are running
2. Check that ports 5173 (frontend) and 8000 (backend) are available
3. Clear npm cache: `npm cache clean --force`
4. Reinstall dependencies: `rm -rf node_modules && npm install`

## Technology Stack

- React 18 with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- Axios for API calls
- Modern responsive design

