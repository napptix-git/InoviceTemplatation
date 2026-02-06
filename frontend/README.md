# Invoice Template Automation - React Frontend

A modern React + TypeScript frontend for the Invoice Template Automation system, built with Vite and styled with Tailwind CSS.

## Features

- 📄 Modern, responsive invoice editor interface
- 🎨 Clean design with Tailwind CSS
- 📱 Mobile-friendly responsive layout
- 🔄 Real-time calculations (Budget, VAT, Total)
- 📅 Date and month picker widgets
- 👥 Client dropdown with add-client functionality
- 💾 Save invoices with validation
- 📊 Summary metrics display
- ⚡ Fast development with Vite

## Prerequisites

- Node.js 16+ and npm or yarn
- Python backend running on `http://localhost:8000` (see backend API setup)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional):
```env
REACT_APP_API_URL=http://localhost:8000
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

The development server includes a proxy to the backend API running on `http://localhost:8000`.

## Building

Build for production:

```bash
npm run build
```

This generates optimized files in the `dist` directory.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ClientDropdown.tsx
│   │   ├── DatePicker.tsx
│   │   ├── MonthPicker.tsx
│   │   ├── TextInput.tsx
│   │   ├── TextArea.tsx
│   │   ├── Select.tsx
│   │   ├── InvoiceForm.tsx
│   │   └── SummarySection.tsx
│   ├── services/            # API client and services
│   │   └── api.ts
│   ├── App.tsx             # Main app component
│   ├── App.css             # App styles
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Backend Integration

The frontend communicates with the Python backend API. Make sure to start the Flask API server:

```bash
# From the invoice_automation directory
python api.py
```

The backend should be running on `http://localhost:8000`.

## Available API Endpoints

- `GET /api/invoice/initial` - Get initial invoice template data
- `GET /api/clients` - Get all clients
- `POST /api/clients/add` - Add new client
- `GET /api/invoice/next-number` - Get next invoice number
- `POST /api/invoice/validate` - Validate invoice data
- `POST /api/invoice/save` - Save invoice
- `GET /health` - Health check

## Styling with Tailwind CSS

The project uses Tailwind CSS for styling. To customize:

1. Edit `tailwind.config.js` for theme configuration
2. Add custom styles in `src/index.css`
3. Use Tailwind classes directly in components

## Troubleshooting

### Backend not connecting
- Ensure the Flask API is running on port 8000
- Check CORS is enabled on the backend
- Verify `REACT_APP_API_URL` environment variable if needed

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf dist`

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

## License

Same as the main project
